import { useForm } from '@tanstack/react-form';
import { ZodObject } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import {
    Calendar as CalendarIcon,
    CheckIcon,
    ChevronsUpDownIcon,
} from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';

export type AutoFormField =
    | {
          type: 'text';
          specificType?: 'number' | 'date' | 'text';
          name: string;
          label: string;
          colSpan?: number;
          placeholder?: string;
          description?: string;
      }
    | {
          type: 'textarea';
          name: string;
          label: string;
          colSpan?: number;
          placeholder?: string;
          rows?: number;
          description?: string;
      }
    | {
          type: 'select';
          name: string;
          label: string;
          searchable?: boolean;
          colSpan?: number;
          placeholder?: string;
          description?: string;
          options: { label: string; value: string | number }[];
      }
    | {
          type: 'date';
          name: string;
          label: string;
          colSpan?: number;
          placeholder?: string;
          description?: string;
      };

export interface AutoFormConfig {
    title: string;
    description?: string;
    fields: AutoFormField[];
    schema: ZodObject<any>;
    defaultValues: Record<string, any>;
    columns?: number;
    submitLabel?: string;
    resetLabel?: string;
    onSubmit?: (values: any, formApi: any) => Promise<void> | void;
}

const colSpans = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
};

export function AutoForm({
    title,
    description,
    fields,
    schema,
    defaultValues,
    columns = 1,
    submitLabel = 'Submit',
    resetLabel = 'Reset',
    onSubmit,
}: AutoFormConfig) {
    const parsedDefaultValues = useMemo(() => {
        const values = { ...defaultValues };
        fields.forEach((field) => {
            const val = values[field.name];
            if (val === undefined || val === null) return;

            if (field.type === 'text' && field.specificType === 'number') {
                values[field.name] = String(val);
            }

            // Only parse Dates. Do NOT convert numbers to strings here.
            if (field.type === 'date' && typeof val === 'string') {
                values[field.name] = new Date(val);
            }
        });
        return values;
    }, [defaultValues, fields]);

    const form = useForm({
        defaultValues: parsedDefaultValues,
        validators: { onSubmit: schema },
        onSubmit: async ({ value }) => {
            await onSubmit?.(value, form);
        },
    });

    const placedFields = fields.map((field) => ({
        field,
        colSpan: Math.min(field.colSpan ?? 1, columns),
    }));

    return (
        <Card className="mx-auto w-full sm:max-w-5xl">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && (
                    <CardDescription>{description}</CardDescription>
                )}
            </CardHeader>

            <CardContent>
                <form
                    id="auto-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    {/* Fields Grid */}
                    <div
                        className="grid gap-6"
                        style={{
                            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                        }}
                    >
                        {placedFields.map(({ field, colSpan }) => (
                            <div key={field.name} className={colSpans[colSpan]}>
                                <form.Field
                                    name={field.name}
                                    children={(fieldApi) => {
                                        const isInvalid =
                                            fieldApi.state.meta.isTouched &&
                                            !fieldApi.state.meta.isValid;

                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel
                                                    htmlFor={field.name}
                                                >
                                                    {field.label}
                                                </FieldLabel>

                                                {/* TEXT INPUT */}
                                                {field.type === 'text' && (
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        type={
                                                            field.specificType ??
                                                            'text'
                                                        }
                                                        value={
                                                            fieldApi.state.value
                                                        }
                                                        onBlur={
                                                            fieldApi.handleBlur
                                                        }
                                                        onChange={(e) =>
                                                            fieldApi.handleChange(
                                                                e.target.value,
                                                            )
                                                        }
                                                        aria-invalid={isInvalid}
                                                        placeholder={
                                                            field.placeholder
                                                        }
                                                    />
                                                )}

                                                {/* TEXTAREA */}
                                                {field.type === 'textarea' && (
                                                    <Textarea
                                                        id={field.name}
                                                        name={field.name}
                                                        rows={field.rows ?? 6}
                                                        value={
                                                            fieldApi.state.value
                                                        }
                                                        onBlur={
                                                            fieldApi.handleBlur
                                                        }
                                                        onChange={(e) =>
                                                            fieldApi.handleChange(
                                                                e.target.value,
                                                            )
                                                        }
                                                        aria-invalid={isInvalid}
                                                        placeholder={
                                                            field.placeholder
                                                        }
                                                        className="min-h-24 resize-none"
                                                    />
                                                )}

                                                {/* SELECT */}
                                                {field.type === 'select' &&
                                                    !field.searchable && (
                                                        <Select
                                                            // FIX 2: Convert number to string for UI display only
                                                            value={fieldApi.state.value?.toString()}
                                                            onValueChange={(
                                                                val,
                                                            ) => {
                                                                // FIX 3: Find original option to restore the correct type (number or string)
                                                                const selectedOption =
                                                                    field.options.find(
                                                                        (o) =>
                                                                            o.value.toString() ===
                                                                            val,
                                                                    );
                                                                fieldApi.handleChange(
                                                                    selectedOption?.value ??
                                                                        val,
                                                                );
                                                            }}
                                                        >
                                                            <SelectTrigger
                                                                id={field.name}
                                                                aria-invalid={
                                                                    isInvalid
                                                                }
                                                            >
                                                                <SelectValue
                                                                    placeholder={
                                                                        field.placeholder ??
                                                                        'Select...'
                                                                    }
                                                                />
                                                            </SelectTrigger>

                                                            <SelectContent>
                                                                {field.options.map(
                                                                    (opt) => (
                                                                        <SelectItem
                                                                            key={opt.value.toString()}
                                                                            value={opt.value.toString()}
                                                                        >
                                                                            {
                                                                                opt.label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    )}

                                                {/* COMBOBOX */}
                                                {field.type === 'select' &&
                                                    !!field.searchable && (
                                                        <ComboboxField
                                                            fieldName={
                                                                field.name
                                                            }
                                                            placeholder={
                                                                field.placeholder
                                                            }
                                                            options={
                                                                field.options
                                                            }
                                                            value={
                                                                fieldApi.state
                                                                    .value
                                                            }
                                                            // FIX 4: Pass the raw value (number/string) back to form state
                                                            onChange={(val) =>
                                                                fieldApi.handleChange(
                                                                    val,
                                                                )
                                                            }
                                                            isInvalid={
                                                                isInvalid
                                                            }
                                                        />
                                                    )}

                                                {/* DATE PICKER */}
                                                {field.type === 'date' && (
                                                    <DateField
                                                        fieldName={field.name}
                                                        value={
                                                            fieldApi.state.value
                                                        }
                                                        onChange={(val) =>
                                                            fieldApi.handleChange(
                                                                val,
                                                            )
                                                        }
                                                        placeholder={
                                                            field.placeholder
                                                        }
                                                        isInvalid={isInvalid}
                                                    />
                                                )}

                                                {field.description && (
                                                    <FieldDescription>
                                                        {field.description}
                                                    </FieldDescription>
                                                )}

                                                {isInvalid && (
                                                    <FieldError
                                                        errors={
                                                            fieldApi.state.meta
                                                                .errors
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        );
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </form>
            </CardContent>

            <CardFooter>
                <Field
                    orientation="horizontal"
                    className="flex justify-end gap-2"
                >
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => form.reset()}
                    >
                        {resetLabel}
                    </Button>

                    <Button type="submit" form="auto-form">
                        {submitLabel}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}

function ComboboxField({
    fieldName,
    value,
    onChange,
    placeholder,
    options,
    isInvalid,
}: {
    fieldName: string;
    value: string | number; // Value can be number
    onChange: (value: string | number) => void; // Output can be number
    placeholder?: string;
    options: { label: string; value: string | number }[];
    isInvalid: boolean;
}) {
    const [open, setOpen] = useState(false);

    const selectedLabel = options.find(
        (o) => o.value.toString() === value?.toString(),
    )?.label;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={fieldName}
                    variant={'outline'}
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'flex items-center justify-between hover:bg-background data-[state=open]:border-ring data-[state=open]:ring-[3px] data-[state=open]:ring-ring/50',
                        !value && 'text-muted-foreground',
                        isInvalid ? 'border-red-500' : 'border-input',
                    )}
                >
                    {selectedLabel || placeholder || 'Select...'}
                    <ChevronsUpDownIcon className="h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-md p-0" align="start">
                <Command className="w-full">
                    <CommandInput placeholder={placeholder ?? 'Search...'} />
                    <CommandList>
                        <CommandGroup>
                            {options.map((opt) => (
                                <CommandItem
                                    key={opt.value.toString()}
                                    value={opt.label}
                                    onSelect={() => {
                                        // FIX 5: Pass raw opt.value (number) instead of toString()
                                        onChange(opt.value);
                                        setOpen(false);
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            opt.value.toString() ===
                                                value?.toString()
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    {opt.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

function DateField({
    fieldName,
    value,
    onChange,
    placeholder,
    isInvalid,
}: {
    fieldName: string;
    value: Date | null;
    onChange: (value: Date | null) => void;
    placeholder?: string;
    isInvalid: boolean;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id={fieldName}
                    variant="outline"
                    className={cn(
                        'flex items-center justify-start text-left font-normal hover:bg-background data-[state=open]:border-ring data-[state=open]:ring-[3px] data-[state=open]:ring-ring/50',
                        !value && 'text-muted-foreground',
                        isInvalid ? 'border-destructive' : 'border-input',
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value
                        ? format(value, 'PPP')
                        : (placeholder ?? 'Pick a date')}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value ?? undefined}
                    onSelect={(date) => onChange(date ?? null)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
