"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/shared/ui/kit/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit/toggle-group";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/ui/kit/input-group";
import { useState, useEffect, useRef } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/shared/ui/kit/command";

const formSchema = z.object({
  entityType: z.literal(["individual", "company"]),
  email: z.email(),
  firstName: z.string().min(2).max(25),
  lastName: z.string().min(2).max(25),
  phoneNumber: z
    .string()
    .nonempty("Phone number is required")
    .refine(
      (val) => {
        const pn = parsePhoneNumberFromString(val);
        return !!pn && pn.isValid();
      },
      { message: "Invalid phone number" },
    ),
  address: z.object({
    formatted: z.string(),
    lat: z.number(),
    lon: z.number(),
    street: z.string().nonempty("Street is required"),
    houseNumber: z.string().nonempty("House number is required"),
    city: z.string().nonempty("City is required"),
    postcode: z.string().nonempty("Postal code is required"),
    country: z.string().nonempty("Country is required"),
  }),
});

export function CheckoutForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entityType: "individual",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: {
        formatted: "",
        lat: 0,
        lon: 0,
        street: "",
        houseNumber: "",
        city: "",
        postcode: "",
        country: "",
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!autocompleteValue || autocompleteValue.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(autocompleteValue)}&filter=countrycode:ro&limit=7&apiKey=${apiKey}`
        );
        const data = await response.json();
        setSuggestions(data.features || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [autocompleteValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  function handleSelectPlace(place: any) {
    if (!place) return;
    const p = place.properties;
    
    const street = p.street || p.name || "";
    const houseNumber = p.housenumber || p.house_number || "";
    const city = p.city || p.municipality || "";
    const postcode = p.postcode || p.postal_code || "";
    const country = p.country || "Romania";

    const setValueOptions = {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    };

    if (street) form.setValue("address.street", street, setValueOptions);
    if (houseNumber) form.setValue("address.houseNumber", houseNumber, setValueOptions);
    if (city) form.setValue("address.city", city, setValueOptions);
    if (postcode) form.setValue("address.postcode", postcode, setValueOptions);
    if (country) form.setValue("address.country", country, setValueOptions);
    form.setValue("address.formatted", p.formatted || "", setValueOptions);
    form.setValue("address.lat", p.lat || 0, setValueOptions);
    form.setValue("address.lon", p.lon || 0, setValueOptions);

    form.trigger(["address.street", "address.houseNumber", "address.city", "address.postcode", "address.country"]);

    setAutocompleteValue("");
    setSuggestions([]);
    setShowSuggestions(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full"
      >
        <FormField
          control={form.control}
          name="entityType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entity type *</FormLabel>
              <FormControl>
                <ToggleGroup
                  variant={"outline"}
                  type="single"
                  value={field.value}
                  className="flex flex-col items-stretch gap-2 w-full"
                  onValueChange={(val) => field.onChange(val)}
                >
                  <ToggleGroupItem
                    value="individual"
                    className="justify-start !bg-transparent data-[state=on]:border-primary data-[state=on]:ring-[1px] data-[state=on]:ring-primary !rounded-md"
                  >
                    Individual Person
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="company"
                    className="justify-start !bg-transparent data-[state=on]:border-primary data-[state=on]:ring-[1px] data-[state=on]:ring-primary !rounded-md"
                  >
                    Legal Entity / Company
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput placeholder="Enter email" {...field} />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      variant="secondary"
                      className="cursor-pointer"
                    >
                      Send code
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number *</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Address autocomplete (optional)</FormLabel>
          <FormControl>
            <div ref={autocompleteRef} className="relative w-full">
              <Command shouldFilter={false} className="rounded-lg border overflow-visible">
                  <Input
                    placeholder="Search address to auto-fill fields below"
                    value={autocompleteValue}
                    onChange={(e) => setAutocompleteValue(e.target.value)}
                    onFocus={() => {
                      if (suggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                {showSuggestions && (
                  <CommandList className="max-h-80">
                    {suggestions.length === 0 ? (
                      <CommandEmpty>No addresses found.</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {suggestions.map((suggestion) => {
                          const p = suggestion.properties;
                          return (
                            <CommandItem
                              key={suggestion.properties.place_id}
                              value={`${p.name || p.formatted} ${p.formatted || ""}`}
                              onSelect={() => handleSelectPlace(suggestion)}
                              className="flex flex-col items-start gap-1 py-2"
                            >
                              <div className="font-semibold">
                                {p.name || p.formatted}
                              </div>
                              {p.formatted && p.formatted !== (p.name || "") && (
                                <div className="text-xs text-muted-foreground">
                                  {p.formatted}
                                </div>
                              )}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    )}
                  </CommandList>
                )}
              </Command>
            </div>
          </FormControl>
        </FormItem>
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter street name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.houseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House number *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter house number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal code *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter postal code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="fixed left-0 px-5 py-3 bottom-0 border-t bg-background w-full md:static md:p-0 md:border-none flex flex-col gap-2 items-center">
          <p className="text-muted-foreground text-sm text-center">
            Lorem ipsum dolor sit amet.
          </p>
          <Button type="submit" className="w-full h-12 text-base" size={"lg"}>
            Go to payment
          </Button>
        </div>
      </form>
    </Form>
  );
}
