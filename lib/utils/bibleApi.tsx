// BibleVerse.tsx
import { useState, useEffect } from "react";

interface BibleVerse {
  text?: string;
  verse: string;
  reference: string;
}

const BibleVerseComponent: React.FC = () => {
  const [bibleVerse, setBibleVerse] = useState<BibleVerse | null>(null);

  useEffect(() => {
    const fetchBibleVerse = async () => {
      try {
        // Fetch the list of all verses
        const response = await fetch("https://bible-api.com/john 3:16");
        const data = await response.json();

        // Select a random verse from the list
        const randomIndex = Math.floor(Math.random() * data.verses.length);
        const randomVerse = data.verses[randomIndex];

        setBibleVerse({
          verse: randomVerse.reference,
          reference: randomVerse.text,
        });
      } catch (error) {
        console.error("Error fetching Bible verse:", error);
      }
    };

    fetchBibleVerse();
  }, []);

  return (
    <div className="p-4 border border-gray-300 rounded-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Today's Bible Verse</h2>
      {bibleVerse ? (
        <>
          <p className="text-gray-700 mb-2">{bibleVerse.verse}</p>
          <p className="text-lg font-semibold">{bibleVerse.reference}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BibleVerseComponent;
