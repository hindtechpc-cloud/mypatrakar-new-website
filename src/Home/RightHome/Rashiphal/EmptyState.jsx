export default function EmptyState({ image, link, altText, message }) {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-white p-3 shadow-lg rounded">
      {link ? (
        <a href={link} target="_blank" rel="noreferrer">
          <img
            src={image}
            alt={altText || "Fallback"}
            className="w-full max-w-xs object-contain rounded-sm mb-4"
          />
        </a>
      ) : (
        <img
          src={image}
          alt={altText || "Fallback"}
          className="w-full max-w-xs object-contain rounded-sm mb-4"
        />
      )}

      {message && <p className="text-gray-500 text-center text-sm">{message}</p>}
    </div>
  );
}
