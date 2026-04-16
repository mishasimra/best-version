import { Linkedin, MessageCircle, Twitter } from "lucide-react";
import { useMemo } from "react";

const defaultText = "I'm building my best version. Check out my progress!";

export function ShareButtons({ label = "Share your progress", text = defaultText, url }) {
  const shareUrl = useMemo(() => {
    if (url) return url;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }, [url]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(text);

  const links = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: Twitter,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      icon: MessageCircle,
    },
  ];

  return (
    <div className="share">
      <span className="share-label">{label}</span>
      <div className="share-buttons">
        {links.map((item) => (
          <a
            key={item.label}
            className={`share-button share-${item.label.toLowerCase()}`}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Share on ${item.label}`}
            title={`Share on ${item.label}`}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
