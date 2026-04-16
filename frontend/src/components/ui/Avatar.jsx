function getInitials(name = "") {
  const parts = name.trim().split(" ").filter(Boolean);
  if (!parts.length) return "BV";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

export function Avatar({ src, name, size = 48 }) {
  if (src) {
    return <img className="avatar" src={src} alt={name || "User avatar"} style={{ width: size, height: size }} />;
  }

  return (
    <div className="avatar avatar-fallback" style={{ width: size, height: size }}>
      <span>{getInitials(name)}</span>
    </div>
  );
}
