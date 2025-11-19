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
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from '@/components/ui/input-group';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// -------------------------------
// TYPES
// -------------------------------

export type AutoFormField =
    | {
          type: 'text';
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
          maxChars?: number;
          description?: string;
      }
    | {
          type: 'select';
          name: string;
          label: string;
          colSpan?: number;
          placeholder?: string;
          description?: string;
          options: { label: string; value: string }[];
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

// ======================================================
// AutoForm Component
// ======================================================

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
    const form = useForm({
        defaultValues,
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
                                                    <InputGroup>
                                                        <InputGroupTextarea
                                                            id={field.name}
                                                            name={field.name}
                                                            rows={
                                                                field.rows ?? 6
                                                            }
                                                            value={
                                                                fieldApi.state
                                                                    .value
                                                            }
                                                            onBlur={
                                                                fieldApi.handleBlur
                                                            }
                                                            onChange={(e) =>
                                                                fieldApi.handleChange(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            aria-invalid={
                                                                isInvalid
                                                            }
                                                            placeholder={
                                                                field.placeholder
                                                            }
                                                            className="min-h-24 resize-none"
                                                        />

                                                        {field.maxChars && (
                                                            <InputGroupAddon align="block-end">
                                                                <InputGroupText className="tabular-nums">
                                                                    {
                                                                        fieldApi
                                                                            .state
                                                                            .value
                                                                            .length
                                                                    }{' '}
                                                                    /{' '}
                                                                    {
                                                                        field.maxChars
                                                                    }
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                        )}
                                                    </InputGroup>
                                                )}

                                                {/* SELECT FIELD */}
                                                {field.type === 'select' && (
                                                    <Select
                                                        value={
                                                            fieldApi.state.value
                                                        }
                                                        onValueChange={(val) =>
                                                            fieldApi.handleChange(
                                                                val,
                                                            )
                                                        }
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
                                                                        key={
                                                                            opt.value
                                                                        }
                                                                        value={
                                                                            opt.value
                                                                        }
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
