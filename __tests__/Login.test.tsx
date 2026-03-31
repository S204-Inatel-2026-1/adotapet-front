// /// <reference types="jest" />
// /// <reference types="@testing-library/jest-dom" />

import "@testing-library/jest-dom"; // Garante que o TS entenda o toBeInTheDocument
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../src/app/login/page";

// Mock do next/link ajustado para o ESLint ficar feliz
jest.mock("next/link", () => {
    const MockedLink = ({ children, href }: { children: React.ReactNode; href?: string }) => {
        return <a href={href || "#"}>{children}</a>;
    };
    MockedLink.displayName = "MockedLink"; // Resolve o erro de "missing display name"
    return MockedLink;
});

describe("Página de Login - Validações do Zod", () => {
    it("deve mostrar mensagens de erro ao tentar enviar o formulário vazio", async () => {
        render(<Login />);

        const botoes = screen.getAllByRole("button");
        const botaoEntrar = botoes.find((b) => b.textContent === "Entrar");

        expect(botaoEntrar).toBeDefined();

        if (botaoEntrar) {
            await userEvent.click(botaoEntrar);
        }

        await waitFor(() => {
            expect(screen.getByText("O e-mail é obrigatório")).toBeInTheDocument();
            expect(screen.getByText("A senha deve ter no mínimo 8 caracteres")).toBeInTheDocument();
        });
    });

    it("deve mostrar mensagem de erro no login ao tentar enviar o formulário", async () => {
        render(<Login />);

        const inputEmail = screen.getByLabelText("E-mail");
        const inputSenha = screen.getByLabelText("Senha");

        const botoes = screen.getAllByRole("button");
        const botaoEntrar = botoes.find((b) => b.textContent === "Entrar");

        await userEvent.type(inputSenha, "senhaSegura123");

        if (botaoEntrar) {
            await userEvent.click(botaoEntrar);
        }

        await waitFor(() => {
            expect(screen.queryByText("O e-mail é obrigatório")).toBeInTheDocument();
        });
    });

    it("erro no login falta o @", async () => {
        render(<Login />);

        const inputEmail = screen.getByLabelText("E-mail");
        const inputSenha = screen.getByLabelText("Senha");

        const botoes = screen.getAllByRole("button");
        const botaoEntrar = botoes.find((b) => b.textContent === "Entrar");

        await userEvent.type(inputEmail, "lucas.adotapet.com");
        await userEvent.type(inputSenha, "senhaSegura123");

        if (botaoEntrar) {
            await userEvent.click(botaoEntrar);
        }

        await waitFor(() => {
            expect(screen.queryByText("Digite um formato de e-mail válido")).toBeInTheDocument();
        });
    });

    it("deve mostrar mensagem de erro na senha ao tentar enviar o formulário", async () => {
        render(<Login />);

        const inputEmail = screen.getByLabelText("E-mail");
        const inputSenha = screen.getByLabelText("Senha");

        const botoes = screen.getAllByRole("button");
        const botaoEntrar = botoes.find((b) => b.textContent === "Entrar");

        await userEvent.type(inputEmail, "lucas@adotapet.com");

        if (botaoEntrar) {
            await userEvent.click(botaoEntrar);
        }

        await waitFor(() => {
            expect(screen.queryByText("A senha deve ter no mínimo 8 caracteres")).toBeInTheDocument();
        });
    });

    it("erro na senha (senha muito curta)", async () => {
        render(<Login />);

        const inputEmail = screen.getByLabelText("E-mail");
        const inputSenha = screen.getByLabelText("Senha");

        const botoes = screen.getAllByRole("button");
        const botaoEntrar = botoes.find((b) => b.textContent === "Entrar");

        await userEvent.type(inputEmail, "lucas@adotapet.com");
        await userEvent.type(inputSenha, "12345");

        if (botaoEntrar) {
            await userEvent.click(botaoEntrar);
        }

        await waitFor(() => {
            expect(screen.queryByText("A senha deve ter no mínimo 8 caracteres")).toBeInTheDocument();
        });
    });

    it("deve passar na validação ao preencher dados corretos (Caminho Feliz)", async () => {
        render(<Login />);

        const inputEmail = screen.getByLabelText("E-mail");
        const inputSenha = screen.getByLabelText("Senha");

        const botoes = screen.getAllByRole("button");
        const botaoEntrar = botoes.find((b) => b.textContent === "Entrar");

        await userEvent.type(inputEmail, "lucas@adotapet.com");
        await userEvent.type(inputSenha, "senhaSegura123");

        if (botaoEntrar) {
            await userEvent.click(botaoEntrar);
        }

        await waitFor(() => {
            expect(screen.queryByText("O e-mail é obrigatório")).not.toBeInTheDocument();
            expect(screen.queryByText("A senha deve ter no mínimo 8 caracteres")).not.toBeInTheDocument();
        });
    });

    it("deve passar na validação ao preencher dados corretos (Caminho Feliz - feedback visual)", async () => {
        render(<Login />);

        const inputEmail = screen.getByLabelText("E-mail");
        const inputSenha = screen.getByLabelText("Senha");

        const botoes = screen.getAllByRole("button");
        const botaoEntrar = botoes.find((b) => b.textContent === "Entrar");

        await userEvent.type(inputEmail, "lucas@adotapet.com");
        await userEvent.type(inputSenha, "senhaSegura123");

        if (botaoEntrar) {
            await userEvent.click(botaoEntrar);
        }

        await waitFor(() => {
            expect(screen.queryByText("O e-mail é obrigatório")).not.toBeInTheDocument();
            expect(screen.queryByText("A senha deve ter no mínimo 8 caracteres")).not.toBeInTheDocument();
        });
    });
});