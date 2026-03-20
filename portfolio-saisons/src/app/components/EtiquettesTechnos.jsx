const TECHNOS = [
  "Java",
  "React",
  "Go",
  "SQL",
  "JavaScript",
  "CSS",
];

export default function EtiquettesTechnos() {
  return (
    <div className="etiquettes-technos">
      {TECHNOS.map((techno) => (
        <span key={techno} className="etiquette-techno">
          {techno}
        </span>
      ))}
    </div>
  );
}
