import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaHackathon } from "./Esquema";

export function HackathonForm() {
  const [exito, setExito] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquemaHackathon),
    defaultValues: {
      nombre: "",
      email: "",
      nivel: "principiante",
      tallaCamiseta: "M",
      lenguajes: [],
      github: "",
      aceptanNormas: false,
    },
  });

  const nombreWatch = watch("nombre");

  async function onSubmit(datos) {
    setExito(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Datos de inscripción válidos:", datos);
    setExito(true);
    reset();
  }

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>📋 Inscripción a la hackathon «HackU-tad 2026»</h2>

      {exito && (
        <div style={{ padding: "1rem", backgroundColor: "#d4edda", color: "#155724", borderRadius: "4px", marginBottom: "1rem" }}>
          ¡Inscripción recibida! 🎉
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label htmlFor="nombre">Nombre completo:</label>
          <input id="nombre" type="text" {...register("nombre")} style={{ width: "100%", padding: "0.5rem" }} />
          <small style={{ color: "#666" }}>Caracteres: {nombreWatch?.length || 0}</small>
          {errors.nombre && <p style={{ color: "red", margin: "0.2rem 0 0" }}>{errors.nombre.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register("email")} style={{ width: "100%", padding: "0.5rem" }} />
          {errors.email && <p style={{ color: "red", margin: "0.2rem 0 0" }}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="nivel">Nivel de experiencia:</label>
          <select id="nivel" {...register("nivel")} style={{ width: "100%", padding: "0.5rem" }}>
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzada">Avanzada</option>
          </select>
          {errors.nivel && <p style={{ color: "red", margin: "0.2rem 0 0" }}>{errors.nivel.message}</p>}
        </div>

        <div>
          <label htmlFor="tallaCamiseta">Talla de camiseta:</label>
          <select id="tallaCamiseta" {...register("tallaCamiseta")} style={{ width: "100%", padding: "0.5rem" }}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          {errors.tallaCamiseta && <p style={{ color: "red", margin: "0.2rem 0 0" }}>{errors.tallaCamiseta.message}</p>}
        </div>

        <div>
          <fieldset style={{ border: "1px solid #ccc", padding: "0.8rem", borderRadius: "4px" }}>
            <legend>Lenguajes de programación (elige al menos uno):</legend>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <label><input type="checkbox" value="JavaScript" {...register("lenguajes")} /> JavaScript</label>
              <label><input type="checkbox" value="TypeScript" {...register("lenguajes")} /> TypeScript</label>
              <label><input type="checkbox" value="Python" {...register("lenguajes")} /> Python</label>
              <label><input type="checkbox" value="Rust" {...register("lenguajes")} /> Rust</label>
            </div>
          </fieldset>
          {errors.lenguajes && <p style={{ color: "red", margin: "0.2rem 0 0" }}>{errors.lenguajes.message}</p>}
        </div>

        <div>
          <label htmlFor="github">Perfil de GitHub:</label>
          <input id="github" type="url" placeholder="https://github.com/usuario" {...register("github")} style={{ width: "100%", padding: "0.5rem" }} />
          {errors.github && <p style={{ color: "red", margin: "0.2rem 0 0" }}>{errors.github.message}</p>}
        </div>

        <div>
          <label>
            <input type="checkbox" {...register("aceptanNormas")} /> Acepto las normas y código de conducta de la hackathon
          </label>
          {errors.aceptanNormas && <p style={{ color: "red", margin: "0.2rem 0 0" }}>{errors.aceptanNormas.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} style={{ padding: "0.75rem", fontSize: "1rem", cursor: isSubmitting ? "not-allowed" : "pointer" }}>
          {isSubmitting ? "Enviando..." : "Inscribirme"}
        </button>
      </form>
    </div>
  );
}