import { useEffect, useState } from "react";
import axios from "axios";
import Authentication from "./Authentication";

const AnimeList: React.FC = () => {
  const [animeList, setAnimeList] = useState<any[]>([]);

  const query = `
query {
    Page (page: 1, perPage: 10) {
        media (type: ANIME) {
            id
            title {
                romaji
                english
                native
            }
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
            status
            episodes
            duration
            chapters
            volumes
            isAdult
            genres
            averageScore
            popularity
            source
            countryOfOrigin
            isLicensed
            season
            seasonYear
            coverImage {
                extraLarge
                large
                color
            }
            bannerImage
          }
    }
}
`;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://graphql.anilist.co", {
          query: query,
        });

        setAnimeList(response.data.data.Page.media);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Anime List</h1>
      <ul>
        {animeList.map((anime) => (
          <li key={anime.id}>
            {anime.id} {anime.title.romaji}
          </li>
        ))}
      </ul>
      <Authentication />
    </div>
  );
};

export default AnimeList;
