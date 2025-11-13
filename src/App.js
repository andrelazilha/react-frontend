import { useEffect, useState } from "react";
import { listarPessoas, criarPessoa } from "./api";
import PessoaForm from "./components/PessoaForm";
import PessoaList from "./components/PessoaList";

export default function App() {
    const [pessoas, setPessoas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erroLista, setErroLista] = useState("");

    async function carregar() {
        setErroLista("");
        setCarregando(true);
        try {
            const data = await listarPessoas();
            setPessoas(data);
        } catch (e) {
            setErroLista(e.message || "Falha ao carregar pessoas");
        } finally {
            setCarregando(false);
        }
    }

    async function handleCriado(novaPessoa) {
        await criarPessoa(novaPessoa);
        await carregar(); // recarrega a lista após salvar
    }

    useEffect(() => {
        carregar();
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.h1}>Cadastro de Pessoas</h1>

            <div style={styles.grid}>
                <PessoaForm onCriado={handleCriado} />
                <PessoaList
                    pessoas={pessoas}
                    carregando={carregando}
                    erro={erroLista}
                    onReload={carregar}
                />
            </div>

            <footer style={styles.footer}>
                <small>
                    API: <code>{process.env.REACT_APP_API_URL || "http://localhost:8080"}</code>
                </small>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: 980,
        margin: "40px auto",
        padding: "0 16px",
        fontFamily: "Inter, system-ui, Arial",
    },
    h1: { marginTop: 0, marginBottom: 18 },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18,
    },
    footer: { marginTop: 24, opacity: 0.7 },
};