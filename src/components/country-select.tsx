"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { COUNTRY_CODES } from "@/lib/country-codes"

interface CountrySelectProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function CountrySelect({ value, onChange, className }: CountrySelectProps) {
  const [open, setOpen] = React.useState(false)

  const selectedCountry = React.useMemo(
    () => COUNTRY_CODES.find((c) => c.code === value) || COUNTRY_CODES[0],
    [value]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex items-center justify-between outline-none text-sm transition-colors",
            className
          )}
        >
          {selectedCountry.label}
          <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command
          filter={(value, search) => {
            const country = COUNTRY_CODES.find(c => c.code === value);
            if (!country) return 0;
            const searchLower = search.toLowerCase();
            if (
              country.name.toLowerCase().includes(searchLower) ||
              country.code.includes(searchLower)
            ) {
              return 1;
            }
            return 0;
          }}
        >
          <CommandInput placeholder="Search country or code..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {COUNTRY_CODES.map((country) => (
                <CommandItem
                  key={country.code + country.name}
                  value={country.code}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.label} <span className="ml-2 text-muted-foreground">({country.name})</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
