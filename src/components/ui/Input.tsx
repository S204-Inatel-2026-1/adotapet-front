import React, { forwardRef } from "react";

// Definimos o que o nosso Input pode receber (além das coisas normais do HTML)
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string; // Se receber uma string aqui, o input fica vermelho!
}

// Usamos o forwardRef para o React Hook Form conseguir se conectar a ele
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", type, label, error, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {/* Renderiza a Label se ela for passada */}
                {label && (
                    <label className="text-sm font-medium text-foreground">
                        {label}
                    </label>
                )}

                {/* O Input em si, com as cores do Figma Make */}
                <input
                    type={type}
                    ref={ref}
                    className={`
            flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground
            file:border-0 file:bg-transparent file:text-sm file:font-medium
            placeholder:text-muted-foreground
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            transition-colors duration-200
            ${error
                            ? "border-destructive focus-visible:ring-destructive" // Estado de erro (Vermelho)
                            : "border-border focus-visible:ring-ring"             // Estado normal (Borda padrão)
                        }
            ${className}
          `}
                    {...props}
                />

                {/* Renderiza a mensagem de erro em vermelho logo abaixo do input */}
                {error && (
                    <span className="text-xs font-medium text-destructive mt-0.5">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

// Necessário quando usamos forwardRef para o React não se perder nos logs
Input.displayName = "Input";