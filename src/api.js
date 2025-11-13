const API =
    process.env.REACT_APP_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

export async function listarPessoas() {
    const r = await fetch(`${API}/api/pessoas`);
    if (!r.ok) throw new Error("Falha ao listar pessoas");
    return r.json();
}

export async function criarPessoa(pessoa) {
    const r = await fetch(`${API}/api/pessoas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pessoa),
    });
    if (!r.ok) {
        const text = await r.text().catch(() => "");
        throw new Error(text || "Falha ao criar pessoa");
    }
    return r.json();
}