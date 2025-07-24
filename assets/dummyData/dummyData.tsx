import { logos } from "@/constants";

export const dummyData = {
  theatre: {
    id: "1",
    name: "AMC Theatres",
    address: "123 Movie St, Los Angeles, CA 90001",
    geometry: {
      location: {
        lat: 34.0522,
        lng: -118.2437
      }
    },
    screens: [
      {
        number: "1",
        movie: {
          id: "101",
          backdropPath: "https://example.com/inception-backdrop.jpg",
          genres: [{ id: 28, name: "Action" }],
          title: "Inception",
          synopsis:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
          release_date: "2010-07-16",
          runtime: "148 minutes",
          tagline: "Your mind is the scene of the crime.",
          status: "Released",
          vote_average: 8.8,
          poster_path: "https://example.com/inception-poster.jpg"
        },
        type: {
          projector: "IMAX",
          tagline: "Experience the thrill in IMAX!",
          logo: "https://example.com/imax-logo.png"
        },
        features: ["3D", "Dolby Atmos", "Luxury Seating"],
        showtimes: ["12:00 PM", "3:00 PM", "6:00 PM"]
      }
    ]
  },
  type: {
    projector: "IMAX",
    logo: logos.imax,
    tagline: "Experience the thrill in IMAX!",
    seatCount: 200
  },
  features: ["3D", "Dolby Atmos", "Luxury Seating"],
  showtimes: ["12:00 PM", "3:00 PM", "6:00 PM"]
};
