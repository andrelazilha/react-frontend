export default function PessoaList({ pessoas, carregando, erro, onReload }) {
    return (
        <div style={styles.card}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 style={{ margin: 0 }}>Pessoas</h2>
                <button style={styles.reload} onClick={onReload} disabled={carregando}>
                    {carregando ? "Atualizando..." : "Recarregar"}
                </button>
            </div>

            {erro && <div style={styles.error}>{erro}</div>}

            {!carregando && pessoas?.length === 0 && (
                <div style={styles.empty}>Nenhum registro ainda.</div>
            )}

            <ul style={styles.ul}>
                {pessoas.map((p) => (
                    <li key={p.id} style={styles.li}>
                        <div style={{ fontWeight: 600 }}>{p.nome}</div>
                        <div style={{ opacity: 0.75 }}>Idade: {p.idade}</div>
                        <div style={{ opacity: 0.6, fontSize: 12 }}>ID: {p.id}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    card: {
        border: "1px solid #eee",
        borderRadius: 12,
        padding: 16,
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,.05)",
    },
    ul: { listStyle: "none", padding: 0, margin: "12px 0 0" },
    li: {
        padding: "12px 10px",
        border: "1px solid #eee",
        borderRadius: 10,
        marginBottom: 10,
        background: "#fafafa",
    },
    reload: {
        border: "1px solid #ddd",
        background: "#f8fafc",
        padding: "8px 12px",
        borderRadius: 8,
        cursor: "pointer",
    },
    error: {
        marginTop: 10,
        padding: "8px 10px",
        borderRadius: 8,
        background: "#fee2e2",
        color: "#991b1b",
        border: "1px solid #fecaca",
    },
    empty: {
        marginTop: 10,
        padding: "8px 10px",
        borderRadius: 8,
        background: "#f1f5f9",
        color: "#334155",
        border: "1px solid #e2e8f0",
    },
};