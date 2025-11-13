import { useState } from "react";

export default function PessoaForm({ onCriado }) {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");
        if (!nome.trim()) {
            setErro("Informe o nome.");
            return;
        }
        if (!idade || Number.isNaN(Number(idade))) {
            setErro("Informe uma idade válida.");
            return;
        }
        setEnviando(true);
        try {
            await onCriado({ nome: nome.trim(), idade: Number(idade) });
            setNome("");
            setIdade("");
        } catch (err) {
            setErro(err.message || "Erro inesperado");
        } finally {
            setEnviando(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={styles.card}>
            <h2 style={styles.h2}>Cadastrar Pessoa</h2>

            <label style={styles.label}>Nome</label>
            <input
                style={styles.input}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: André"
            />

            <label style={styles.label}>Idade</label>
            <input
                style={styles.input}
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                placeholder="Ex.: 32"
                inputMode="numeric"
            />

            {erro && <div style={styles.error}>{erro}</div>}

            <button style={styles.button} disabled={enviando}>
                {enviando ? "Enviando..." : "Salvar"}
            </button>
        </form>
    );
}

const styles = {
    card: {
        border: "1px solid #eee",
        borderRadius: 12,
        padding: 16,
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,.05)",
        maxWidth: 420,
    },
    h2: { marginTop: 0 },
    label: { display: "block", marginTop: 12, fontWeight: 600 },
    input: {
        width: "100%",
        padding: 10,
        borderRadius: 8,
        border: "1px solid #ddd",
        marginTop: 6,
    },
    button: {
        marginTop: 16,
        padding: "10px 14px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        background: "#0ea5e9",
        color: "#fff",
        fontWeight: 600,
    },
    error: {
        marginTop: 10,
        padding: "8px 10px",
        borderRadius: 8,
        background: "#fee2e2",
        color: "#991b1b",
        border: "1px solid #fecaca",
    },
};