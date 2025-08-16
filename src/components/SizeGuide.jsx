import { useEffect, useState } from "react";

export default function SizeGuide({ open, onClose, grupo = "ninas" }) {
  const [tab, setTab] = useState(grupo); // 'ninas' | 'bebes'
  useEffect(() => { if (open) setTab(grupo); }, [open, grupo]);
  if (!open) return null;

  const NINAS = [
    { talle: "2",  altura: 92,  pecho: 52, cintura: 50, cadera: 56 },
    { talle: "4",  altura: 104, pecho: 56, cintura: 53, cadera: 60 },
    { talle: "6",  altura: 116, pecho: 60, cintura: 56, cadera: 64 },
    { talle: "8",  altura: 128, pecho: 64, cintura: 58, cadera: 68 },
    { talle: "10", altura: 140, pecho: 68, cintura: 60, cadera: 72 },
    { talle: "12", altura: 152, pecho: 72, cintura: 62, cadera: 76 },
  ];

  const BEBES = [
    { talle: "0-3 m",  altura: "55–62",   peso: "4–6 kg",   pecho: 42, cintura: 42 },
    { talle: "3-6 m",  altura: "62–68",   peso: "6–8 kg",   pecho: 44, cintura: 44 },
    { talle: "6-9 m",  altura: "68–74",   peso: "8–9.5 kg", pecho: 46, cintura: 45 },
    { talle: "9-12 m", altura: "74–80",   peso: "9.5–11 kg",pecho: 48, cintura: 46 },
    { talle: "12-18 m",altura: "80–86",   peso: "11–12.5 kg",pecho: 50, cintura: 48 },
    { talle: "18-24 m",altura: "86–92",   peso: "12.5–13.5 kg",pecho: 52, cintura: 50 },
  ];

  return (
    <>
      <div className="sg2-backdrop" onClick={onClose} />
      <div className="sg2-modal" role="dialog" aria-modal="true" aria-label="Guía de talles">
        <div className="sg2-card shadow-lg">
          <div className="sg2-header">
            <h5 className="m-0">Guía de talles</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>✕</button>
          </div>

          <div className="sg2-tabs btn-group">
            <button
              className={`btn btn-sm ${tab==='ninas' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={()=>setTab('ninas')}
            >
              Niñas (2–12)
            </button>
            <button
              className={`btn btn-sm ${tab==='bebes' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={()=>setTab('bebes')}
            >
              Bebés (0–24 m)
            </button>
          </div>

          <div className="sg2-tablewrap">
            {tab === "ninas" ? (
              <table className="table table-sm mb-0 align-middle">
                <thead>
                  <tr>
                    <th>Talle</th><th>Altura (cm)</th><th>Pecho (cm)</th><th>Cintura (cm)</th><th>Cadera (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {NINAS.map(r=>(
                    <tr key={r.talle}>
                      <td className="fw-semibold">{r.talle}</td>
                      <td>{r.altura}</td><td>{r.pecho}</td><td>{r.cintura}</td><td>{r.cadera}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="table table-sm mb-0 align-middle">
                <thead>
                  <tr>
                    <th>Talle</th><th>Altura (cm)</th><th>Peso</th><th>Pecho (cm)</th><th>Cintura (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {BEBES.map(r=>(
                    <tr key={r.talle}>
                      <td className="fw-semibold">{r.talle}</td>
                      <td>{r.altura}</td><td>{r.peso}</td><td>{r.pecho}</td><td>{r.cintura}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="sg2-howto small text-muted">
            <strong>Cómo medir:</strong> Pecho rodeando la parte más amplia; cintura en la parte
            más angosta (sin apretar); cadera por la parte más ancha. Medí con una cinta y dejá
            1–2 cm de holgura.
          </div>

          <div className="sg2-footer">
            <button className="btn btn-primary w-100" onClick={onClose}>Entendido</button>
          </div>
        </div>
      </div>
    </>
  );
}
