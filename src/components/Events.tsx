import { useState, useEffect } from "react";
import { getTranslations } from "../utils/i18n";
import type LocaleProps from "../interfaces/LocaleProps";

interface Event {
  id: string;
  name: string;
  dateTime: string;
  venue: string;
  link: string;
}

export default function Events({ locale }: LocaleProps) {
  const t = getTranslations(locale);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, you would fetch events from Meetup API
    // For this demo, we're simulating an API call with setTimeout
    setLoading(true);

    const fetchEvents = () => {
      // Simulate API call
      setTimeout(() => {
        try {
          // Mock data - in reality you would fetch from Meetup API
          const mockEvents = [
            {
              id: "1",
              name: "Python Web Development with FastAPI",
              dateTime: "2024-07-15T18:30:00Z",
              venue: "CyberPort",
              link: "https://meetup.com/event1",
            },
            {
              id: "2",
              name: "Data Science with Python Workshop",
              dateTime: "2024-08-01T19:00:00Z",
              venue: "Science Park",
              link: "https://meetup.com/event2",
            },
          ];

          setEvents(mockEvents);
          setLoading(false);
        } catch (err) {
          setError("Failed to load events. Please try again later.");
          setLoading(false);
        }
      }, 1000);
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("events.title")}
        </h2>

        {loading && (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="ml-2">{t("events.loading")}</p>
          </div>
        )}

        {error && (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {events.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h3 className="card-title">{event.name}</h3>
                      <p>
                        <strong>Date & Time:</strong>{" "}
                        {formatDate(event.dateTime)}
                      </p>
                      <p>
                        <strong>Venue:</strong> {event.venue}
                      </p>
                      <div className="card-actions justify-end">
                        <a
                          href={event.link}
                          className="btn btn-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Register
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-lg">{t("events.noEvents")}</p>
            )}

            <div className="text-center mt-8">
              <a
                href="https://www.meetup.com/hong-kong-python-user-group/"
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("events.viewAll")}
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
