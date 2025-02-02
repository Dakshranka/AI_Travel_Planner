import { GoogleGenerativeAI } from "@google/generative-ai";
 
  const apiKey = import.meta.env.VITE_GOOGLE_GEMMINI_AI_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Loaction: Udaipur, for 3 days for Friends with a cheap budget, give me a Hotels options list with hotel name,hotel address,price,hotel image url,geo coordinates,rating,descriptions and suggest itineary with place name,placedetails,place image url,geo coordinates,ticket pricing,rating,time travel each of the location for 3 days with each day plan with best time to visit in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot directly access and display real-time information, including hotel images, pricing, availability, and real-time geo-coordinates.  Hotel prices and availability change constantly.  Therefore, I can't provide URLs or images.  To get this information, you'll need to use online travel agencies like Booking.com, Expedia, or MakeMyTrip.\n\nHowever, I can provide you with a JSON structure containing the plan, which you can then populate with the details you find using those websites.  Remember to check reviews and compare prices before booking.\n\n```json\n{\n  \"tripName\": \"Udaipur Budget Trip for Friends (3 Days)\",\n  \"budget\": \"Cheap\",\n  \"travelers\": \"Friends\",\n  \"duration\": \"3 Days\",\n  \"bestTimetoVisit\": \"October to March (pleasant weather)\",\n\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1\",\n      \"hotelAddress\": \"Hotel Address 1, Udaipur\",\n      \"priceRange\": \"₹XXX - ₹YYY per night\",  //Replace XXX and YYY with price range\n      \"hotelImageUrl\": \"URL_TO_HOTEL_IMAGE_1\",  //Replace with actual URL\n      \"geoCoordinates\": {\n        \"latitude\": 0.0, //Replace with actual coordinates\n        \"longitude\": 0.0  //Replace with actual coordinates\n      },\n      \"rating\": 3.5, //Replace with actual rating\n      \"description\": \"Description of Hotel 1\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 2\",\n      \"hotelAddress\": \"Hotel Address 2, Udaipur\",\n      \"priceRange\": \"₹XXX - ₹YYY per night\", //Replace XXX and YYY with price range\n      \"hotelImageUrl\": \"URL_TO_HOTEL_IMAGE_2\", //Replace with actual URL\n      \"geoCoordinates\": {\n        \"latitude\": 0.0, //Replace with actual coordinates\n        \"longitude\": 0.0  //Replace with actual coordinates\n      },\n      \"rating\": 4.0,  //Replace with actual rating\n      \"description\": \"Description of Hotel 2\"\n    }\n     // Add more hotels as needed\n  ],\n\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"City Palace\",\n        \"placeDetails\": \"Magnificent palace complex overlooking Lake Pichola\",\n        \"placeImageUrl\": \"URL_TO_CITY_PALACE_IMAGE\", //Replace with actual URL\n        \"geoCoordinates\": {\n          \"latitude\": 0.0, //Replace with actual coordinates\n          \"longitude\": 0.0  //Replace with actual coordinates\n        },\n        \"ticketPricing\": \"₹XXX\", //Replace with actual price\n        \"rating\": 4.5,  //Replace with actual rating\n        \"timeToSpend\": \"3-4 hours\"\n      },\n      {\n        \"placeName\": \"Lake Pichola\",\n        \"placeDetails\": \"Beautiful lake with several islands and palaces\",\n        \"placeImageUrl\": \"URL_TO_LAKE_PICHOLA_IMAGE\", //Replace with actual URL\n        \"geoCoordinates\": {\n          \"latitude\": 0.0, //Replace with actual coordinates\n          \"longitude\": 0.0  //Replace with actual coordinates\n        },\n        \"ticketPricing\": \"Boat ride prices vary\",\n        \"rating\": 4.8,  //Replace with actual rating\n        \"timeToSpend\": \"2 hours\"\n      }\n      // Add more places for Day 1\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"Saheliyon Ki Bari\",\n        \"placeDetails\": \"Garden with fountains and kiosks\",\n        \"placeImageUrl\": \"URL_TO_SAHELIYON_KI_BARI_IMAGE\", //Replace with actual URL\n        \"geoCoordinates\": {\n          \"latitude\": 0.0, //Replace with actual coordinates\n          \"longitude\": 0.0  //Replace with actual coordinates\n        },\n        \"ticketPricing\": \"₹XXX\", //Replace with actual price\n        \"rating\": 4.2, //Replace with actual rating\n        \"timeToSpend\": \"2 hours\"\n      },\n      {\n        \"placeName\": \"Jagdish Temple\",\n        \"placeDetails\": \"Ancient temple dedicated to Lord Vishnu\",\n        \"placeImageUrl\": \"URL_TO_JAGDISH_TEMPLE_IMAGE\", //Replace with actual URL\n        \"geoCoordinates\": {\n          \"latitude\": 0.0, //Replace with actual coordinates\n          \"longitude\": 0.0  //Replace with actual coordinates\n        },\n        \"ticketPricing\": \"₹XXX\", //Replace with actual price\n        \"rating\": 4.0, //Replace with actual rating\n        \"timeToSpend\": \"1 hour\"\n      }\n      // Add more places for Day 2\n    ],\n    \"day3\": [\n      // Add places for Day 3,  consider Monsoon Palace or Fateh Sagar Lake\n    ]\n  }\n}\n```\n\nRemember to replace the placeholders with the actual information you gather from online travel agencies and other reliable sources.  Enjoy your Udaipur trip!\n"},
          ],
        },
      ],
    });
  