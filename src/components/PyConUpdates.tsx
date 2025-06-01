import type LocaleProps from "../interfaces/LocaleProps";
import { getTranslations } from "../utils/i18n";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  link: string;
}

export default function PyConUpdates({ locale }: LocaleProps) {
  const t = getTranslations(locale);

  // Mock news data
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "PyCon HK 2024 Dates Announced",
      summary:
        "Save the date! PyCon Hong Kong 2024 will be held on October 15-17, 2024.",
      imageUrl: "https://placehold.co/600x400/EEE/31343C?text=PyCon+HK+2024",
      link: "#",
    },
    {
      id: 2,
      title: "Call for Speakers Now Open",
      summary:
        "Share your Python knowledge at PyCon HK 2024. Speaker applications are now open.",
      imageUrl:
        "https://placehold.co/600x400/EEE/31343C?text=Call+for+Speakers",
      link: "#",
    },
    {
      id: 3,
      title: "Sponsor Opportunities",
      summary:
        "Support the Python community by becoming a sponsor for PyCon HK 2024.",
      imageUrl: "https://placehold.co/600x400/EEE/31343C?text=Sponsor+PyCon",
      link: "#",
    },
  ];

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-8">
        {t("pycon.title")}
      </h2>

      <div className="carousel w-full">
        {newsItems.map((item, index) => (
          <div
            key={item.id}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full scroll-mt-16"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 w-full p-4">
              <img
                src={item.imageUrl}
                className="w-full md:w-1/2 rounded-lg"
                alt={item.title}
              />
              <div className="w-full md:w-1/2 p-4">
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="mb-4">{item.summary}</p>
                <a href={item.link} className="btn btn-primary">
                  {t("pycon.readMore")}
                </a>
              </div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${index === 0 ? newsItems.length : index}`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${index === newsItems.length - 1 ? 1 : index + 2}`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full py-2 gap-2 mt-4">
        {newsItems.map((_, index) => (
          <a key={index} href={`#slide${index + 1}`} className="btn btn-xs">
            {index + 1}
          </a>
        ))}
      </div>
    </>
  );
}
