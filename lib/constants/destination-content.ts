import type { DestinationContent } from "@/types";

// Default fallback content used when destination-specific content is not yet written
export const fallbackContent: DestinationContent = {
  status: "placeholder",
  overview: [
    "This destination is one of Vietnam's most popular travel spots, attracting visitors from around the world.",
    "Whether you're looking for cultural experiences, natural beauty, or culinary adventures, this destination has something for everyone.",
  ],
  thingsToDo: [
    "Explore the local markets and street food scene",
    "Visit historic temples and pagodas",
    "Take a walking tour of the old town",
    "Enjoy local cuisine at authentic restaurants",
    "Experience the nightlife and entertainment",
    "Day trip to nearby attractions",
  ],
  gettingAround: {
    byAir: "The nearest airport serves domestic and international flights. From the airport, taxis and ride-hailing apps (Grab) are readily available.",
    byTrain: "Vietnam's train network connects major cities. The journey offers scenic views and is a great way to experience the countryside.",
    local: "Within the area, options include taxis, Grab, motorbike rentals, and walking for short distances.",
  },
  faqs: [
    {
      question: "How many days should I spend here?",
      answer: "We recommend 2-4 days to explore the main attractions and get a feel for the local culture. If you want to take day trips or explore more deeply, consider staying 4-5 days.",
    },
    {
      question: "What is the best time to visit?",
      answer: "The best time depends on what you want to do. Generally, the dry season (November to April) offers the best weather. However, each destination has its own microclimate.",
    },
    {
      question: "Is it safe for solo travelers?",
      answer: "Vietnam is generally very safe for solo travelers, including women traveling alone. Use normal precautions, watch your belongings in crowded areas, and you'll have a great experience.",
    },
    {
      question: "Do I need to book accommodation in advance?",
      answer: "During peak season (December-February and July-August), we recommend booking at least a few days ahead for popular areas. In low season, you can often find good deals on arrival.",
    },
  ],
};

// Destination-specific content
// Status: "placeholder" = needs writing, "draft" = written but needs review, "published" = approved
export const destinationContent: Record<string, DestinationContent> = {
  "ho-chi-minh-city": {
    status: "draft",
    overview: [
      "Ho Chi Minh City, still called Saigon by locals, pulses with an energy you won't find anywhere else in Vietnam. This is where motorbike rivers flow through streets lined with French colonial facades, where rooftop bars overlook ancient pagodas, and where the best pho might come from a plastic stool on a random alley.",
      "The city rewards those who dive in. Skip the tourist traps and let a local guide you through District 4's seafood scene or Chinatown's hidden temples. HCMC is chaotic, loud, and absolutely unforgettable - the perfect introduction to Vietnam's entrepreneurial spirit.",
    ],
    thingsToDo: [
      "Explore the War Remnants Museum for a sobering look at Vietnam's recent history",
      "Get lost in Ben Thanh Market's maze of stalls selling everything from silk to spices",
      "Crawl through the Cu Chi Tunnels on a half-day trip from the city",
      "Join a street food tour through District 4 for the city's best banh mi and hu tieu",
      "Watch sunset from a rooftop bar on Nguyen Hue Walking Street",
      "Wander through the art galleries and cafes of District 3's quieter backstreets",
    ],
    gettingAround: {
      byAir: "Tan Son Nhat International Airport (SGN) sits 7km from District 1. Grab to central hotels costs 80,000-120,000 VND and takes 20-45 minutes depending on traffic. Avoid arrivals during rush hour if possible.",
      byTrain: "Saigon Railway Station connects to Hanoi via the Reunification Express (30-35 hours). Shorter routes run to Nha Trang (7 hours), Da Nang (16 hours), and Phan Thiet for Mui Ne (4 hours).",
      local: "Grab is king here - reliable, air-conditioned, and fairly priced. The new Metro Line 1 connects Ben Thanh to the eastern districts. Brave souls can rent motorbikes, but traffic here isn't for beginners.",
    },
    faqs: [
      {
        question: "How many days should I spend in Ho Chi Minh City?",
        answer: "3-4 days lets you see the highlights, take a Cu Chi Tunnels trip, and properly explore the food scene. If you're visiting the Mekong Delta too, add another 1-2 days.",
      },
      {
        question: "What is the best time to visit Ho Chi Minh City?",
        answer: "December to April brings dry weather and temperatures around 28-32°C. The wet season (May-November) means afternoon downpours, but they're usually short. September-October sees the heaviest rain.",
      },
      {
        question: "Is Ho Chi Minh City safe for tourists?",
        answer: "Generally very safe. Watch for phone and bag snatching by motorbike - keep valuables in front pockets or crossbody bags. The biggest danger is honestly the traffic, so cross streets slowly and predictably.",
      },
      {
        question: "Where should I stay in Ho Chi Minh City?",
        answer: "District 1 puts you in the heart of the action - walking distance to major sights, restaurants, and nightlife. District 3 offers a more local vibe at lower prices. Thao Dien in District 2 suits families and longer stays.",
      },
    ],
  },

  "hanoi": {
    status: "draft",
    overview: [
      "Hanoi moves to a different rhythm than its southern sibling. Here, elderly men practice tai chi by Hoan Kiem Lake at dawn, egg coffee is sipped in crumbling French villas, and the Old Quarter's 36 streets still organize themselves by traditional trades. The capital feels like stepping into a living museum that refuses to stop evolving.",
      "This is Vietnam's cultural heart, where you'll find the country's best street food (yes, it's a rivalry), centuries-old temples tucked between modern cafes, and a sophistication that comes from being a seat of power for over a thousand years.",
    ],
    thingsToDo: [
      "Sip egg coffee at Cafe Giang, where this Hanoi specialty was invented in 1946",
      "Watch the sunrise over Hoan Kiem Lake and spot the Temple of the Jade Mountain",
      "Navigate the 36 streets of the Old Quarter, each named for its traditional trade",
      "Catch a water puppet show at Thang Long Theatre - a uniquely Vietnamese art form",
      "Take a day trip to the ancient capital of Hoa Lu and Tam Coc's river caves",
      "Eat bun cha at a street stall - Obama did it and you should too",
    ],
    gettingAround: {
      byAir: "Noi Bai International Airport (HAN) is 25km north of the Old Quarter. Grab costs 250,000-350,000 VND and takes 45-90 minutes depending on traffic. The 86 Express Bus is a reliable budget option at 45,000 VND.",
      byTrain: "Hanoi Railway Station connects to HCMC via the Reunification Express (30+ hours), Sapa via night train (8 hours), and Da Nang (14-17 hours). The train to Sapa is a classic Vietnam experience.",
      local: "The Old Quarter is best explored on foot - it's compact and the chaos is half the charm. Grab works well for longer distances. Hanoi's new metro system is expanding but limited for tourists.",
    },
    faqs: [
      {
        question: "How many days should I spend in Hanoi?",
        answer: "3-4 days covers the city's highlights comfortably. Add 2 more if you're doing overnight trips to Ha Long Bay or Sapa from here, as Hanoi is the main hub for northern Vietnam.",
      },
      {
        question: "What is the best time to visit Hanoi?",
        answer: "October to December brings cool, dry weather perfect for exploring. March-April is pleasant with spring temperatures. Avoid June-August when it's brutally hot and humid, or the drizzly January-February period.",
      },
      {
        question: "Is Hanoi safe for tourists?",
        answer: "Very safe overall. Petty theft and scams targeting tourists exist but aren't common. The main hazard is traffic - cross streets confidently and at a steady pace. Most locals are genuinely friendly and helpful.",
      },
      {
        question: "Where should I stay in Hanoi?",
        answer: "The Old Quarter puts you in the thick of it - noisy but exciting, with restaurants and sights at your doorstep. Hoan Kiem area is slightly calmer but still central. West Lake suits those wanting a quieter, more upscale experience.",
      },
    ],
  },

  "ha-long-bay": {
    status: "draft",
    overview: [
      "Ha Long Bay looks surreal even in photos, but nothing prepares you for seeing those limestone karsts emerge from emerald waters in person. Over 1,600 islands and islets create a seascape that earned UNESCO World Heritage status and a spot on every Vietnam bucket list.",
      "Yes, it's touristy. Yes, you should still go. The key is choosing the right cruise - a good boat takes you to quieter corners where you can kayak through hidden lagoons, swim in secluded coves, and wake up to mist rolling between the peaks.",
    ],
    thingsToDo: [
      "Book an overnight cruise to experience sunset and sunrise over the karsts",
      "Kayak through the Luon Cave tunnel into a secret lagoon surrounded by cliffs",
      "Visit Sung Sot Cave, one of the largest and most impressive grottos in the bay",
      "Swim off the boat deck in the emerald waters between the limestone islands",
      "Watch local fishermen at a floating village and learn about life on the water",
      "Try squid fishing from the boat deck after dinner - surprisingly addictive",
    ],
    gettingAround: {
      byAir: "The nearest airport is Van Don (VDO), 50km from Ha Long City, with limited domestic flights. Most travelers fly into Hanoi and transfer by road (3-4 hours) or seaplane (45 minutes, expensive but spectacular).",
      byTrain: "No direct train service. The closest station is Hai Phong, about 65km away, but buses from Hanoi are more practical. Most cruise packages include round-trip transfers from Hanoi.",
      local: "Once you're on your cruise, the boat is your transport. In Ha Long City itself, taxis and Grab are available, but there's little reason to explore the town - the bay is the attraction.",
    },
    faqs: [
      {
        question: "How many days should I spend in Ha Long Bay?",
        answer: "A 2-day/1-night cruise is the minimum to properly experience the bay. 3 days/2 nights lets you explore more remote areas like Bai Tu Long Bay with less crowding. Day trips exist but feel rushed.",
      },
      {
        question: "What is the best time to visit Ha Long Bay?",
        answer: "October to December offers the best combination of weather and visibility. March to May is also pleasant. Summer (June-August) brings heat and occasional storms. Winter can be foggy but hauntingly beautiful.",
      },
      {
        question: "Is Ha Long Bay safe for tourists?",
        answer: "Very safe. Cruise boats are well-regulated after past safety incidents. Kayaking and swimming are supervised. The main concern is seasickness for those prone to it - the bay is usually calm but not always.",
      },
      {
        question: "Where should I stay in Ha Long Bay?",
        answer: "Stay on a cruise boat - that's the whole point. Budget cruises start around $100/person, mid-range $150-250, and luxury options run $300+. Bai Tu Long Bay cruises offer similar scenery with fewer boats.",
      },
    ],
  },

  "hoi-an": {
    status: "draft",
    overview: [
      "Hoi An casts a spell on everyone who visits. This ancient trading port has preserved its 15th-century architecture so perfectly that wandering its lantern-lit streets feels like time travel. Japanese merchant houses stand next to Chinese temples, French colonial shopfronts, and Vietnamese tube houses.",
      "Beyond the UNESCO-listed Ancient Town, Hoi An offers some of Vietnam's best beaches just a short bike ride away, a legendary food scene, and tailors who can create custom clothing overnight. It's touristy, yes, but earns every bit of its popularity.",
    ],
    thingsToDo: [
      "Stroll the Ancient Town at night when hundreds of silk lanterns illuminate the streets",
      "Get custom clothes made - a tailored suit or dress can be ready in 24 hours",
      "Take a basket boat ride through the coconut palm waterways of Cam Thanh",
      "Cycle to An Bang Beach for the best stretch of sand near town",
      "Join a cooking class at one of Hoi An's renowned culinary schools",
      "Visit the iconic Japanese Covered Bridge, the symbol of Hoi An since 1593",
    ],
    gettingAround: {
      byAir: "Da Nang International Airport (DAD) is 30km away, about 45 minutes by taxi or Grab (250,000-350,000 VND). Many hotels offer airport transfers. There's no airport in Hoi An itself.",
      byTrain: "Da Nang Railway Station is the nearest, with connections to Hanoi (14-17 hours), HCMC (16-20 hours), and Hue (2.5 hours). From the station, take a Grab to Hoi An (45 minutes).",
      local: "Rent a bicycle - Hoi An is flat, compact, and cycling is the best way to explore. Most hotels provide free bikes. For the beach or further afield, motorbikes rent for about 100,000-150,000 VND/day.",
    },
    faqs: [
      {
        question: "How many days should I spend in Hoi An?",
        answer: "3-4 days is perfect for Hoi An. This gives you time to explore the Ancient Town, hit the beach, take a cooking class, and maybe get some tailoring done without rushing. Longer stays are easy to justify.",
      },
      {
        question: "What is the best time to visit Hoi An?",
        answer: "February to May offers warm, dry weather ideal for beaches and exploring. September to January sees more rain, with October-November bringing potential flooding in the Ancient Town. Full moon nights are magical year-round.",
      },
      {
        question: "Is Hoi An safe for tourists?",
        answer: "Extremely safe. Hoi An has very low crime rates and locals are welcoming. The only real concerns are traffic on the main roads and occasional flooding in autumn. It's one of Vietnam's most tourist-friendly destinations.",
      },
      {
        question: "Where should I stay in Hoi An?",
        answer: "The Ancient Town puts you steps from everything but can be noisy. Cam Nam Island offers peace with a 5-minute walk to the action. An Bang Beach area suits those prioritizing sand over sightseeing.",
      },
    ],
  },

  "da-nang": {
    status: "draft",
    overview: [
      "Da Nang has transformed from a quiet coastal city into Vietnam's most liveable urban center. Modern high-rises line pristine beaches, the Dragon Bridge breathes actual fire on weekends, and the famous Golden Bridge at Ba Na Hills has become an Instagram sensation.",
      "For travelers, Da Nang works as both a destination and a base. The city itself offers excellent beaches, surprisingly good nightlife, and easy day trips to Hoi An, Hue, and the dramatic Hai Van Pass. It feels like Vietnam's future while still keeping its coastal soul.",
    ],
    thingsToDo: [
      "Watch the Dragon Bridge breathe fire and water every Saturday and Sunday at 9pm",
      "Ride the cable car to Ba Na Hills and walk across the giant hands of the Golden Bridge",
      "Surf or swim at My Khe Beach, consistently rated among Vietnam's best beaches",
      "Drive or ride the Hai Van Pass, the spectacular mountain road between Da Nang and Hue",
      "Explore the Marble Mountains' Buddhist caves and climb to the panoramic viewpoint",
      "Sample Mi Quang noodles and banh trang cuon at the city's legendary street food spots",
    ],
    gettingAround: {
      byAir: "Da Nang International Airport (DAD) is remarkably central, just 3km from the beach hotels. Grab to My Khe Beach costs around 50,000-80,000 VND and takes 10-15 minutes. Multiple daily flights connect to Hanoi and HCMC.",
      byTrain: "Da Nang Railway Station links to Hanoi (14-17 hours), HCMC (15-20 hours), and Hue (2.5 hours on the scenic route over Hai Van Pass - though the train goes through a tunnel now).",
      local: "Grab is reliable and cheap here. Rent a motorbike (100,000-150,000 VND/day) to explore beaches and the Hai Van Pass. The beach road is flat and easy to cycle.",
    },
    faqs: [
      {
        question: "How many days should I spend in Da Nang?",
        answer: "2-3 days covers Da Nang's highlights including the beaches, Marble Mountains, and a Ba Na Hills trip. Many people base here for 4-5 days and day trip to Hoi An and Hue.",
      },
      {
        question: "What is the best time to visit Da Nang?",
        answer: "March to August brings the best beach weather with calm seas. May-July is peak season with hot, sunny days. September to February is cooler with rain, especially October-December. Typhoons occasionally hit in autumn.",
      },
      {
        question: "Is Da Nang safe for tourists?",
        answer: "Very safe and notably clean by Vietnamese standards. The beach areas and tourist zones feel secure day and night. Swimming conditions at My Khe Beach are generally safe, with lifeguards on duty.",
      },
      {
        question: "Where should I stay in Da Nang?",
        answer: "My Khe Beach has the best mix of beach access, restaurants, and hotels at all price points. Son Tra Peninsula offers luxury resorts. The city center suits business travelers but lacks beach proximity.",
      },
    ],
  },

  "phu-quoc": {
    status: "draft",
    overview: [
      "Phu Quoc has emerged as Vietnam's premier beach destination, and it's easy to see why. This island in the Gulf of Thailand offers the white sand beaches and crystal waters that travelers dream about, plus a thriving food scene, fish sauce factories (trust us, they're interesting), and enough development to be convenient without losing its charm.",
      "The north remains relatively wild, with empty beaches and national park jungle. The south hosts the resorts, waterparks, and cable car to Hon Thom island. Whether you want barefoot luxury or budget beach bumming, Phu Quoc delivers.",
    ],
    thingsToDo: [
      "Chase sunset at Long Beach with a cocktail from one of the beachfront bars",
      "Ride the Hon Thom cable car, the world's longest over-sea cable car at 7.9km",
      "Snorkel or dive around the An Thoi Islands in the clear southern waters",
      "Tour a fish sauce factory to understand Phu Quoc's signature (pungent) export",
      "Explore Phu Quoc National Park's jungle trails and spot wildlife",
      "Visit the Dinh Cau Night Market for grilled seafood at plastic table prices",
    ],
    gettingAround: {
      byAir: "Phu Quoc International Airport (PQC) has direct flights from HCMC (1 hour), Hanoi (2 hours), and several international cities. Grab to Long Beach hotels costs around 100,000-150,000 VND.",
      byTrain: "No train service to Phu Quoc. The island is accessible only by air or ferry from Ha Tien or Rach Gia on the mainland (2-3 hours by fast ferry).",
      local: "Rent a motorbike (150,000-200,000 VND/day) - essential for exploring the island properly. Grab exists but coverage is patchy outside the main tourist areas. Taxis are available but pricey.",
    },
    faqs: [
      {
        question: "How many days should I spend in Phu Quoc?",
        answer: "4-5 days lets you enjoy beaches, take a snorkeling trip, explore the island, and properly relax. 3 days feels rushed. Week-long stays are perfect for those wanting serious beach time.",
      },
      {
        question: "What is the best time to visit Phu Quoc?",
        answer: "November to March is peak season with dry weather and calm seas. April-May is hot but still good. Avoid July-September when monsoon rains can be heavy and seas rough for snorkeling.",
      },
      {
        question: "Is Phu Quoc safe for tourists?",
        answer: "Very safe overall. The island has a relaxed vibe with low crime. Beach safety is good at main beaches. Be cautious on motorbikes - roads can be rough and other drivers unpredictable.",
      },
      {
        question: "Where should I stay in Phu Quoc?",
        answer: "Long Beach has the best range of hotels, restaurants, and sunset views. Ong Lang Beach offers quieter, more upscale options. Duong Dong town suits budget travelers wanting nightlife and markets.",
      },
    ],
  },

  "sapa": {
    status: "draft",
    overview: [
      "Sapa sits at 1,500 meters in the Hoang Lien Son mountains, surrounded by rice terraces that cascade down valleys like giant green staircases. This former French hill station has become the gateway to Vietnam's most dramatic mountain scenery and the homeland of the Hmong, Dao, and other ethnic minorities.",
      "The terraces are spectacular, but Sapa's real magic lies in the cultural encounters. Trek through villages where traditional dress is everyday wear, stay in homestays where you'll help cook dinner, and witness a way of life that's changing rapidly but hasn't yet disappeared.",
    ],
    thingsToDo: [
      "Trek through the rice terraces to Hmong and Dao villages like Cat Cat and Ta Van",
      "Attempt Fansipan, Vietnam's highest peak at 3,143m (cable car available for non-climbers)",
      "Browse the weekend Love Market in Sapa town, a traditional minority meeting place",
      "Stay overnight in a local homestay to experience mountain village life",
      "Visit the Muong Hoa Valley for the most photogenic terraces and fewer crowds",
      "Try thang co, the traditional Hmong horse meat stew, at the local market",
    ],
    gettingAround: {
      byAir: "The nearest airport is Hanoi (HAN), about 320km away. From there, take the overnight train or bus to Sapa (5-6 hours by bus, 8 hours by train to Lao Cai plus 1-hour transfer).",
      byTrain: "Overnight trains from Hanoi to Lao Cai run daily, offering sleeper berths. From Lao Cai station, it's 38km up the mountain to Sapa by bus or taxi (about 1 hour).",
      local: "Sapa town is walkable. For trekking, most visitors hire local guides who know the paths. Motorbikes can reach some villages. The Fansipan cable car runs from town to the summit area.",
    },
    faqs: [
      {
        question: "How many days should I spend in Sapa?",
        answer: "2-3 days allows for proper trekking and village visits. The classic option is an overnight trek with a homestay. Add a day for Fansipan if conquering Vietnam's highest peak appeals.",
      },
      {
        question: "What is the best time to visit Sapa?",
        answer: "September-November offers the most beautiful terraces when rice turns golden before harvest. March-May brings spring blooms. December-February can be cold and foggy. Summer (June-August) is rainy but lush.",
      },
      {
        question: "Is Sapa safe for tourists?",
        answer: "Very safe, including for solo trekkers with guides. The main hazards are slippery trails in wet weather and altitude effects for some visitors. Dress warmly - temperatures drop significantly at night.",
      },
      {
        question: "Where should I stay in Sapa?",
        answer: "Sapa town has hotels with valley views and easy restaurant access. Homestays in Ta Van or Lao Chai villages offer authentic experiences. Topas Ecolodge provides luxury with stunning terrace panoramas.",
      },
    ],
  },

  "nha-trang": {
    status: "draft",
    overview: [
      "Nha Trang is Vietnam's most popular beach resort city, blessed with a beautiful 6km crescent of sand, clear waters, and a backdrop of green mountains. Russian tourists discovered it decades ago, and international visitors have followed, creating a vibrant beach party atmosphere.",
      "Beyond the beach, Nha Trang offers excellent diving around the offshore islands, ancient Cham towers on the city's outskirts, and some of Vietnam's best seafood restaurants. It's not subtle or undiscovered, but sometimes you just want a proper beach vacation.",
    ],
    thingsToDo: [
      "Dive or snorkel at Hon Mun Marine Protected Area for the best underwater visibility",
      "Take a boat tour to the islands for swimming, snorkeling, and floating bars",
      "Visit the Po Nagar Cham Towers, built between the 7th and 12th centuries",
      "Soak in the mineral-rich mud baths at Thap Ba or I-Resort hot springs",
      "Walk the beach promenade at sunset and join the local exercise crowd",
      "Feast on grilled seafood at the night market or beachfront restaurants",
    ],
    gettingAround: {
      byAir: "Cam Ranh International Airport (CXR) is 30km south of the city. Grab or taxi to beachfront hotels costs around 250,000-350,000 VND and takes 35-45 minutes.",
      byTrain: "Nha Trang Railway Station is centrally located with connections to HCMC (7-8 hours), Da Nang (6-7 hours), and Hanoi (20+ hours). The train is a great option from HCMC.",
      local: "The beach area is walkable. Grab works well for getting around. Rent a motorbike (100,000-150,000 VND/day) to explore beyond the tourist strip. Cyclos are available for short touristy trips.",
    },
    faqs: [
      {
        question: "How many days should I spend in Nha Trang?",
        answer: "3-4 days is enough for beach time, an island hopping tour, and exploring the Cham towers. Divers might want 5-6 days to properly explore multiple sites. It's also a good rest stop on a longer trip.",
      },
      {
        question: "What is the best time to visit Nha Trang?",
        answer: "January to August offers the best beach weather with minimal rain. March-April has perfect conditions. October-December sees monsoon rains that can churn up the sea and reduce visibility for diving.",
      },
      {
        question: "Is Nha Trang safe for tourists?",
        answer: "Generally safe, though the tourist focus brings some hassles - aggressive vendors and taxi scams. Watch belongings on the beach. Swimming is usually safe but heed red flag warnings during monsoon season.",
      },
      {
        question: "Where should I stay in Nha Trang?",
        answer: "The beachfront strip has hotels at all price points with direct beach access. The northern end near Tran Phu Bridge is quieter. For luxury, consider the resorts on Hon Tre Island or along the southern coast.",
      },
    ],
  },

  "hue": {
    status: "draft",
    overview: [
      "Hue was Vietnam's imperial capital for 143 years, and its UNESCO-listed monuments still whisper of emperors and mandarins. The Perfume River winds past the Citadel's massive walls, elaborate royal tombs hide in pine forests, and pagodas cling to hillsides. This is Vietnam at its most refined.",
      "But Hue isn't just about history. The city is renowned for its distinctive cuisine - complex, subtle, and served in elegant portions that reflect its royal heritage. Take your time here. Hue rewards those who linger over a bowl of bun bo and contemplate the passing river.",
    ],
    thingsToDo: [
      "Explore the Imperial Citadel's palace grounds, throne rooms, and forbidden Purple City",
      "Cruise the Perfume River to the striking Thien Mu Pagoda at sunset",
      "Visit the elaborate royal tombs of Tu Duc and Minh Mang hidden in the hills",
      "Eat your way through Hue's unique cuisine from bun bo Hue to banh khoai",
      "Ride a motorbike through the surrounding countryside to hidden pagodas",
      "Wander Dong Ba Market for local snacks and the authentic Hue atmosphere",
    ],
    gettingAround: {
      byAir: "Phu Bai International Airport (HUI) is 15km from the city center. Grab to central hotels costs around 150,000-200,000 VND. Flight connections to HCMC and Hanoi are frequent.",
      byTrain: "Hue Railway Station connects to Da Nang (2.5 hours on the scenic Hai Van route), HCMC (13-15 hours), and Hanoi (12-14 hours). The train between Hue and Da Nang is particularly beautiful.",
      local: "The city is compact enough for walking or cycling. Rent a motorbike (100,000-150,000 VND/day) to explore the tombs and countryside. Boats can be hired for Perfume River trips.",
    },
    faqs: [
      {
        question: "How many days should I spend in Hue?",
        answer: "2-3 days covers the Citadel, main tombs, and pagodas with time for culinary exploration. History buffs could spend a week visiting all the royal tombs and lesser-known sites.",
      },
      {
        question: "What is the best time to visit Hue?",
        answer: "January to April brings pleasant weather and minimal rain. Summers are hot but dry. Hue gets heavy rain September-December, with flooding possible in October-November. The rain lends atmosphere but limits tomb visits.",
      },
      {
        question: "Is Hue safe for tourists?",
        answer: "Very safe with low crime rates. The main concerns are rainy season flooding and traffic if you're cycling. Locals are friendly and less pushy than in more tourist-heavy cities.",
      },
      {
        question: "Where should I stay in Hue?",
        answer: "The south bank of the Perfume River has most hotels and restaurants, within walking distance of the Citadel. The French Quarter offers colonial atmosphere. Budget guesthouses cluster near Dong Ba Market.",
      },
    ],
  },

  "da-lat": {
    status: "draft",
    overview: [
      "Da Lat is Vietnam's escape from the heat - a highland retreat at 1,500 meters where French colonizers built villas, planted pines, and introduced strawberries. The cool climate, flower gardens, and French-Vietnamese architecture create an atmosphere unlike anywhere else in the country.",
      "Beyond the somewhat kitsch tourist attractions, Da Lat offers serious coffee culture (this is Vietnam's arabica heartland), adventure activities from canyoning to mountain biking, and a food scene that makes the most of the region's produce. It's also Vietnam's unofficial honeymoon capital.",
    ],
    thingsToDo: [
      "Canyoning at Datanla Falls - repelling down waterfalls in the jungle",
      "Tour a coffee farm to taste some of Vietnam's finest arabica beans",
      "Explore the delightfully weird Hang Nga Crazy House architectural oddity",
      "Take the cable car over pine forests to Truc Lam Zen Monastery",
      "Hunt for bargains at the massive Da Lat Night Market",
      "Cycle around Xuan Huong Lake and through the flower gardens at dawn",
    ],
    gettingAround: {
      byAir: "Lien Khuong Airport (DLI) is 30km from downtown Da Lat. Grab or taxi costs around 250,000-350,000 VND. Direct flights connect to HCMC, Hanoi, and Da Nang.",
      byTrain: "No train service to Da Lat, though a 7km heritage railway runs to Trai Mat village with an old French locomotive - purely for tourism.",
      local: "Da Lat is hilly, making motorbikes the practical choice (150,000-200,000 VND/day). Grab works in the center. The town center is walkable, but attractions spread across the hills.",
    },
    faqs: [
      {
        question: "How many days should I spend in Da Lat?",
        answer: "2-3 days covers the main sights, a coffee tour, and either canyoning or mountain biking. Couples often stay 4-5 days to enjoy the relaxed pace and romantic atmosphere.",
      },
      {
        question: "What is the best time to visit Da Lat?",
        answer: "December to March is dry and cool (15-24°C) - perfect weather. Flower blooms peak in spring (March-April). The rainy season (May-October) brings afternoon showers but lush scenery and fewer tourists.",
      },
      {
        question: "Is Da Lat safe for tourists?",
        answer: "Very safe with a mellow atmosphere. The hills and occasional fog make driving after dark tricky. Canyoning and adventure activities are well-run but require normal adventure sport precautions.",
      },
      {
        question: "Where should I stay in Da Lat?",
        answer: "The center around Xuan Huong Lake puts you near restaurants and the night market. Boutique hotels in the hills offer valley views. Couples often splurge on French colonial style properties.",
      },
    ],
  },

  "ninh-binh": {
    status: "draft",
    overview: [
      "Ninh Binh delivers Ha Long Bay's dramatic karst scenery without the boats and crowds. Limestone mountains punch up from rice paddies and rivers, creating a landscape so striking it's earned the nickname 'Ha Long Bay on land.' Temples, caves, and the ancient capital of Hoa Lu add cultural weight to the natural spectacle.",
      "Most visitors come as a day trip from Hanoi, but staying overnight lets you catch sunrise over the paddies, cycle empty paths between the peaks, and properly explore Trang An and Tam Coc's boat-filled waterways at a relaxed pace.",
    ],
    thingsToDo: [
      "Take a rowing boat through Tam Coc's three cave tunnels carved through the karsts",
      "Explore the Trang An boat caves and temple complex, a UNESCO World Heritage site",
      "Climb 500 steps to the peak of Mua Cave for the definitive Ninh Binh panorama",
      "Cycle through the peaceful Tam Coc countryside past rice paddies and buffalo",
      "Visit Hoa Lu, Vietnam's 10th-century capital, with its royal temples and history",
      "Discover Bai Dinh Pagoda, Southeast Asia's largest Buddhist temple complex",
    ],
    gettingAround: {
      byAir: "Hanoi's Noi Bai Airport (HAN) is the closest, about 100km north. Most visitors arrange transport through hotels or join tours from Hanoi.",
      byTrain: "Ninh Binh Railway Station connects to Hanoi (2 hours) and HCMC (via Da Nang). From the station, it's about 7km to Tam Coc where most tourists stay.",
      local: "Rent a bicycle to explore - the flat terrain and scenic routes make cycling ideal. Motorbikes are available. Boats at Tam Coc and Trang An are hired at official piers. Grab has limited coverage here.",
    },
    faqs: [
      {
        question: "How many days should I spend in Ninh Binh?",
        answer: "2 days is ideal - enough for Tam Coc boats, Mua Cave viewpoint, cycling, and Trang An or Bai Dinh. One day feels rushed. Day trips from Hanoi work but miss the magical early morning light.",
      },
      {
        question: "What is the best time to visit Ninh Binh?",
        answer: "May-June offers golden rice ready for harvest - the most photogenic time. September-October brings green paddies after planting. Winter (December-February) can be grey and chilly. Avoid weekends and holidays when it's crowded.",
      },
      {
        question: "Is Ninh Binh safe for tourists?",
        answer: "Very safe and low-key. The boat women at Tam Coc have a reputation for aggressive tipping requests - tip fairly but don't feel pressured. Roads are quiet for cycling.",
      },
      {
        question: "Where should I stay in Ninh Binh?",
        answer: "Tam Coc village has the best selection of homestays and small hotels with karst views. Ninh Binh city is more urban with less charm. Bungalows in the rice paddies offer the most atmospheric experience.",
      },
    ],
  },

  "mui-ne": {
    status: "draft",
    overview: [
      "Mui Ne exists for two things: wind and sand. This long stretch of beach on Vietnam's southern coast has become Southeast Asia's premier kitesurfing destination, with reliable winds from November to March drawing riders from around the world. The red and white sand dunes add an almost Saharan touch to the scenery.",
      "Even if you don't kite, Mui Ne offers a more relaxed beach alternative to Nha Trang's party scene. The fishing village at the east end provides a dose of authentic Vietnam, while the resort strip delivers easy beach access and fresh seafood at reasonable prices.",
    ],
    thingsToDo: [
      "Learn to kitesurf - conditions here are perfect for beginners and pros alike",
      "Sandboard or slide down the red and white sand dunes at sunrise",
      "Watch fishermen in colorful coracles at the Mui Ne fishing village",
      "Walk the Fairy Stream's canyon through red sandstone formations",
      "Eat seafood at the beachfront restaurants watching the surf kites dance",
      "Take a jeep tour to both sand dunes, the fishing village, and Fairy Stream",
    ],
    gettingAround: {
      byAir: "The closest airports are Cam Ranh (CXR) near Nha Trang (4 hours drive) or Tan Son Nhat (SGN) in HCMC (4.5 hours). Some travelers fly to Dalat and continue overland.",
      byTrain: "Phan Thiet Railway Station is 20km from Mui Ne, with connections to HCMC (4 hours) and Nha Trang (3 hours). The train from HCMC is a popular option.",
      local: "The resort strip stretches for 10km along the beach road. Rent a motorbike (100,000-150,000 VND/day) to explore. Grab works but isn't always quick. Many resorts offer bike loans.",
    },
    faqs: [
      {
        question: "How many days should I spend in Mui Ne?",
        answer: "3-4 days is enough for kitesurfing lessons, the dunes, and beach time. Serious kitesurfers stay for weeks. As a quick beach stop between HCMC and Da Lat or Nha Trang, 2 days works.",
      },
      {
        question: "What is the best time to visit Mui Ne?",
        answer: "November to March brings the best wind for kitesurfing and dry weather. April-May is transitional. June-October is monsoon season with rain and inconsistent wind but cheaper prices and fewer crowds.",
      },
      {
        question: "Is Mui Ne safe for tourists?",
        answer: "Generally safe, though the long beach strip can feel isolated in places. Kitesurfing is well-regulated with experienced schools. Watch for rip currents when swimming. The main road has fast traffic.",
      },
      {
        question: "Where should I stay in Mui Ne?",
        answer: "The central beach strip has the most resorts and restaurants. Ham Tien end is livelier with kitesurfing schools and nightlife. Mui Ne village end is quieter. Budget options and the fishing village are in the east.",
      },
    ],
  },

  "phong-nha": {
    status: "draft",
    overview: [
      "Phong Nha is cave country - specifically, home to some of the largest and most spectacular caves on Earth. Son Doong, the world's biggest cave, lurks beneath these jungle-covered mountains, while Paradise Cave, Phong Nha Cave, and dozens of others offer more accessible underground adventures.",
      "Above ground, Phong Nha-Ke Bang National Park protects one of Asia's most biodiverse regions. The tiny town has transformed from a remote outpost into an adventure hub, but retains its village feel. This is real frontier Vietnam, raw and rewarding.",
    ],
    thingsToDo: [
      "Explore Paradise Cave's vast chambers stretching 31km into the mountain",
      "Boat through Phong Nha Cave, the park's most accessible underground river system",
      "Tackle the Dark Cave adventure tour with zipline, mud bath, and kayaking",
      "Drive the spectacular Bong Lai Valley through jungle and rice paddies",
      "Take a motorbike to the abandoned Ho Chi Minh Trail sections",
      "Book the Hang En expedition for a night camping inside Vietnam's third-largest cave",
    ],
    gettingAround: {
      byAir: "Dong Hoi Airport (VDH) is 45km south with daily flights from HCMC and Hanoi. Grab or taxi to Phong Nha costs around 400,000-500,000 VND.",
      byTrain: "Dong Hoi Railway Station connects to Hanoi (8-10 hours) and HCMC (12-14 hours). From there, arrange transport to Phong Nha (45km) through your hotel.",
      local: "Motorbike rental (150,000-200,000 VND/day) is essential - the caves and sights are spread across a wide area. Phong Nha village is walkable. Grab doesn't really work here.",
    },
    faqs: [
      {
        question: "How many days should I spend in Phong Nha?",
        answer: "3-4 days covers the main caves and some adventure activities. The full Hang En cave expedition takes 2 days/1 night. Son Doong requires 4 days and booking months ahead. Cave enthusiasts could spend a week.",
      },
      {
        question: "What is the best time to visit Phong Nha?",
        answer: "February to August is dry season with easier cave access and better roads. September to January brings rain - some caves close and roads flood. The caves are spectacular year-round if accessible.",
      },
      {
        question: "Is Phong Nha safe for tourists?",
        answer: "Very safe, though adventures like Dark Cave require basic fitness. Book cave tours through reputable operators - Oxalis runs the big expeditions. Mountain roads can be tricky, especially in rain.",
      },
      {
        question: "Where should I stay in Phong Nha?",
        answer: "Phong Nha village has hostels, homestays, and small hotels along the river. Farm stays in the valley offer more peace. There's no luxury here - it's still a rural Vietnamese village at heart.",
      },
    ],
  },

  "mekong-delta": {
    status: "draft",
    overview: [
      "The Mekong Delta is where Vietnam's great river meets the sea in a maze of channels, islands, and floating markets. Rice paddies and fruit orchards line the banks, stilt houses cluster where waterways cross, and local life moves at the pace of a rowing boat. This is Vietnam at its most agricultural and authentic.",
      "Most visitors see the Delta as a day trip from HCMC, but staying overnight reveals the rhythm of life here - predawn floating markets, homestays in orchard farms, and a slower pace that feels like stepping back in time.",
    ],
    thingsToDo: [
      "Float through the Cai Rang floating market at sunrise while vendors hawk fruit from boats",
      "Cycle through coconut palm-lined paths on the islands around Ben Tre",
      "Sample local specialties: elephant ear fish, coconut candy, and tropical fruits straight from trees",
      "Stay in a homestay on a fruit orchard island for an authentic Delta experience",
      "Navigate narrow canals by rowing boat through mangroves and nipa palm",
      "Visit a traditional brick factory or rice paper workshop to see local industries",
    ],
    gettingAround: {
      byAir: "Can Tho International Airport (VCA) has limited domestic flights. Most visitors arrive overland from HCMC. Phu Quoc Island flights sometimes route through Can Tho.",
      byTrain: "No train service to the Delta. The region is accessed by bus or car from HCMC (Can Tho is 170km, about 3.5 hours by road).",
      local: "Boats are the traditional transport - tours include various boat rides. For independent travel, rent a motorbike in Can Tho. Ferries cross the larger rivers. The road network has improved significantly.",
    },
    faqs: [
      {
        question: "How many days should I spend in the Mekong Delta?",
        answer: "2-3 days allows for floating markets, island cycling, a homestay, and village visits. Day trips from HCMC feel rushed - you spend most of the time driving. One overnight minimum recommended.",
      },
      {
        question: "What is the best time to visit the Mekong Delta?",
        answer: "December to May is dry season with easier travel. Fruit harvest peaks in summer (May-July). The wet season (June-November) sees higher water levels making some areas more scenic but muddy.",
      },
      {
        question: "Is the Mekong Delta safe for tourists?",
        answer: "Very safe with welcoming locals. The main concerns are sun exposure on the water and ferry safety standards on some smaller boats. Drink bottled water. Mosquitoes are present - bring repellent.",
      },
      {
        question: "Where should I stay in the Mekong Delta?",
        answer: "Can Tho is the largest city with hotels and Cai Rang market access. Ben Tre offers quieter island homestays. Vinh Long has authentic market scenes. My Tho is closest to HCMC but least atmospheric.",
      },
    ],
  },

  "cat-ba": {
    status: "draft",
    overview: [
      "Cat Ba Island offers a different way to experience the famous karst seascape - staying on land rather than a boat. From here, you can kayak into Lan Ha Bay's emerald waters, rock climb on limestone cliffs rising from the sea, and hike through the island's national park without the cruise ship crowds.",
      "The island has a scruffy, backpacker charm. Cat Ba town is nothing pretty, but the beaches, viewpoints, and adventure activities make up for it. This is Ha Long Bay for travelers who prefer active exploration over floating hotel luxury.",
    ],
    thingsToDo: [
      "Kayak through Lan Ha Bay's hidden lagoons and floating fishing villages",
      "Rock climb on sea cliffs with Deep Water Solo - fall into the water if you slip",
      "Trek through Cat Ba National Park to spot the endangered Cat Ba langur",
      "Cycle around the island past beaches, rice paddies, and karst scenery",
      "Take a boat to secluded beaches only accessible by water",
      "Visit Hospital Cave, a former secret wartime hospital inside a mountain",
    ],
    gettingAround: {
      byAir: "The nearest airports are Hanoi (150km) or Cat Bi in Hai Phong (30km plus ferry). The Hanoi-Cat Ba route involves bus plus ferry or speedboat, taking 3-4 hours total.",
      byTrain: "Hai Phong Railway Station connects to Hanoi (2 hours). From Hai Phong, ferries reach Cat Ba Island (about 1 hour by speedboat from Got pier).",
      local: "Rent a motorbike (150,000-200,000 VND/day) to explore the island. Cat Ba town is walkable. Boat tours depart from the harbor for bay exploration. No Grab here - negotiate with taxi drivers.",
    },
    faqs: [
      {
        question: "How many days should I spend on Cat Ba?",
        answer: "2-3 days allows for kayaking, a national park hike, and relaxing on beaches. Rock climbers often stay longer. Cat Ba works as an alternative to Ha Long Bay cruises or a complement to them.",
      },
      {
        question: "What is the best time to visit Cat Ba?",
        answer: "April to October brings warm weather for swimming and water activities. The island gets busy with domestic tourists in summer (June-August). Winter is cooler and rainier but less crowded.",
      },
      {
        question: "Is Cat Ba safe for tourists?",
        answer: "Generally safe, though Cat Ba town can feel a bit rough around the edges. Water activities are usually well-supervised. Roads are winding - drive carefully on motorbikes, especially after dark.",
      },
      {
        question: "Where should I stay on Cat Ba?",
        answer: "Cat Ba town has the most options - hotels, hostels, and restaurants line the waterfront. Cat Co beaches offer beachside bungalows but limited dining. Some homestays exist in villages outside town.",
      },
    ],
  },

  "ha-giang": {
    status: "draft",
    overview: [
      "Ha Giang is Vietnam at its most spectacular and least touched by mass tourism. The Ha Giang Loop - a 350km route through the country's northernmost mountains - has become a bucket-list road trip for adventurous travelers. Think vertiginous passes, ethnic minority villages, and scenery that makes you stop every five minutes.",
      "This isn't easy travel. The roads are challenging, the infrastructure basic, and the cultural gap with local Hmong, Tay, and Lo Lo communities significant. But for those willing to make the effort, Ha Giang rewards with experiences and landscapes found nowhere else in Vietnam.",
    ],
    thingsToDo: [
      "Drive or ride the famous Ma Pi Leng Pass, Vietnam's most dramatic mountain road",
      "Watch sunrise from the Quan Ba Heaven Gate over the twin mountains below",
      "Explore Dong Van ancient town with its stone houses and Sunday market",
      "Visit Lung Cu Flag Tower at Vietnam's northernmost point",
      "Stay in a traditional Hmong homestay and learn about local traditions",
      "Photograph the Nho Que River canyon, a turquoise ribbon 800 meters below",
    ],
    gettingAround: {
      byAir: "Ha Giang has no airport. The nearest is Hanoi (280km, 6-7 hours by road). Night buses from Hanoi arrive early morning, ready for loop departure.",
      byTrain: "No train to Ha Giang. Take the train to Lao Cai (Sapa line) for a different northern approach, then bus across to Ha Giang.",
      local: "Motorbike is essential for the loop - rent in Ha Giang town (200,000-300,000 VND/day) or book an easy rider (driver) if you're not confident on mountain roads. The loop typically takes 3-4 days.",
    },
    faqs: [
      {
        question: "How many days should I spend in Ha Giang?",
        answer: "4-5 days is ideal for the complete loop with stops for photography, village visits, and not rushing the mountain passes. 3 days is possible but rushed. Add a day if coming from Hanoi.",
      },
      {
        question: "What is the best time to visit Ha Giang?",
        answer: "September to November offers clear skies and golden rice terraces. March to May brings spring blooms and terraces being planted. January-February has buckwheat flowers but cold and fog. Avoid June-August monsoon.",
      },
      {
        question: "Is Ha Giang safe for tourists?",
        answer: "The roads are the main hazard - mountain passes are steep, narrow, and sometimes in poor condition. Don't overestimate your riding skills. Book an easy rider driver if uncertain. Weather changes fast at altitude.",
      },
      {
        question: "Where should I stay in Ha Giang?",
        answer: "Ha Giang town is the start/end point with proper hotels. Along the loop, Tam Son, Yen Minh, Dong Van, and Meo Vac have guesthouses. Homestays in villages offer cultural experiences but basic facilities.",
      },
    ],
  },

  "quy-nhon": {
    status: "draft",
    overview: [
      "Quy Nhon is what Vietnam's beach destinations looked like before mass tourism arrived. This working port city has stunning crescent beaches, ancient Cham temple ruins, and fresh seafood at local prices - all without the crowds, touts, or tourist infrastructure of Nha Trang or Da Nang.",
      "The city serves as central Vietnam's off-radar gem. Yes, getting here takes more effort than the big resorts. Yes, English isn't widely spoken. That's the point. Quy Nhon is for travelers who value authenticity over convenience.",
    ],
    thingsToDo: [
      "Explore the Thap Doi Cham Towers, well-preserved 12th-century temple ruins right in the city",
      "Swim at Ky Co beach, a stunning cove 25km north requiring a boat ride to reach",
      "Walk the Quy Nhon city beach at dawn with the local exercise crowd",
      "Eat banh xeo Quy Nhon style - smaller and crispier than the southern version",
      "Day trip to Eo Gio, a dramatic cliff gap where ocean waves crash through",
      "Ride to Bai Xep fishing village, a tiny community on a beautiful bay",
    ],
    gettingAround: {
      byAir: "Phu Cat Airport (UIH) is 30km from the city with flights from HCMC and Hanoi. Grab or taxi to the beach area costs around 200,000-250,000 VND.",
      byTrain: "Dieu Tri Railway Station is 10km from the city center, with connections to HCMC (11 hours), Nha Trang (3 hours), and Da Nang (4 hours). The coastal train route is scenic.",
      local: "Rent a motorbike (100,000-150,000 VND/day) to explore beaches and surroundings. Grab works in the city. The beach strip is walkable. Boats to Ky Co leave from Nhon Ly port.",
    },
    faqs: [
      {
        question: "How many days should I spend in Quy Nhon?",
        answer: "2-3 days covers the main beaches, Cham towers, and day trips to Ky Co and Eo Gio. It's a good stop between Da Nang and Nha Trang, or a quiet beach escape from busier destinations.",
      },
      {
        question: "What is the best time to visit Quy Nhon?",
        answer: "March to September brings the best beach weather with calm seas. January-February is cooler but dry. October-December sees the most rain. Avoid late October to mid-November when storms can hit.",
      },
      {
        question: "Is Quy Nhon safe for tourists?",
        answer: "Very safe with low tourist-focused crime since there aren't many tourists. Swimming is generally safe at main beaches. The main challenge is communication - few locals speak English.",
      },
      {
        question: "Where should I stay in Quy Nhon?",
        answer: "The beach road (Xuan Dieu) has the best hotels with sea views. The city center near the Cham towers suits those wanting local atmosphere. A few beach resorts exist south of town for more luxury.",
      },
    ],
  },

  "con-dao": {
    status: "draft",
    overview: [
      "Con Dao is Vietnam's end-of-the-road paradise - a remote archipelago that served as a brutal French and American prison colony for over a century. Today, the former prisons draw history seekers, while pristine beaches, world-class diving, and nesting sea turtles attract those seeking serious escape.",
      "Getting here takes effort and the island has limited development, which is precisely the appeal. Con Dao offers Vietnam's most exclusive beach experience without manufactured luxury. The national park protects both the jungle-covered interior and the surrounding marine ecosystem.",
    ],
    thingsToDo: [
      "Dive or snorkel the coral reefs for some of Vietnam's best underwater visibility",
      "Visit the Con Dao Prison complex and learn about its harrowing history",
      "Watch sea turtles nest and hatch on Bay Canh Island (June-September)",
      "Hike through Con Dao National Park's jungle to empty beaches",
      "Pay respects at Hang Duong Cemetery, where revolutionary hero Vo Thi Sau is buried",
      "Relax on Dam Trau Beach, consistently rated among Vietnam's most beautiful",
    ],
    gettingAround: {
      byAir: "Con Dao Airport (VCS) has daily flights from HCMC (45 minutes) and occasional flights from Can Tho. Book ahead - flights fill up, especially on weekends.",
      byTrain: "No train service. Alternative access is by high-speed ferry from Vung Tau (3 hours) or Can Tho, though sea conditions can cancel services.",
      local: "Rent a motorbike (150,000-200,000 VND/day) to explore the island - the 15km main road is scenic and manageable. Walking works in Con Son town. Boat trips reach outer islands.",
    },
    faqs: [
      {
        question: "How many days should I spend in Con Dao?",
        answer: "3-5 days balances beach time, diving, prison visits, and island exploration. Serious divers stay a week. The limited flight schedule sometimes means adding an extra day anyway.",
      },
      {
        question: "What is the best time to visit Con Dao?",
        answer: "March to June offers the calmest seas and best diving visibility. June-September is turtle nesting season. October-February brings rougher seas and occasional storms. The island is quietest on weekdays.",
      },
      {
        question: "Is Con Dao safe for tourists?",
        answer: "Very safe with minimal tourist-related issues. Swimming is safe at main beaches. Diving operations are well-regulated. The remote location means medical facilities are limited - travel insurance is essential.",
      },
      {
        question: "Where should I stay in Con Dao?",
        answer: "Con Son town has most options from budget guesthouses to the famous Six Senses resort. An Hai Road has several beachfront boutique hotels. Book ahead during Vietnamese holidays and weekends.",
      },
    ],
  },

  "vung-tau": {
    status: "draft",
    overview: [
      "Vung Tau is Saigon's beach - the closest stretch of sand to Vietnam's largest city and a weekend escape for millions. The beaches aren't Vietnam's prettiest, but they're accessible, the seafood is excellent, and there's something endearing about this working-class seaside town with a giant Jesus statue watching over it.",
      "For travelers, Vung Tau works as a quick beach break from HCMC or a ferry connection to Con Dao. The Russian oil industry presence adds an unexpected international flavor, while the old French lighthouse and Whale Temple add cultural interest beyond the beach.",
    ],
    thingsToDo: [
      "Climb to the massive Christ the King statue for panoramic coastal views",
      "Take the cable car to Ho May park on Small Mountain for hilltop amusements",
      "Visit the Whale Temple where local fishermen worship whale bones and maritime spirits",
      "Watch sunset from Back Beach with a cold beer and grilled seafood",
      "Explore the White Villa, a former French colonial governor's residence",
      "Walk the scenic coastal road connecting Front and Back beaches",
    ],
    gettingAround: {
      byAir: "No airport in Vung Tau. The closest is Tan Son Nhat in HCMC, about 100km away. High-speed ferry from HCMC is the popular choice.",
      byTrain: "No train service. High-speed hydrofoils from HCMC (District 1) take about 90 minutes and run multiple times daily. Bus from HCMC takes 2-2.5 hours.",
      local: "Vung Tau is compact enough for motorbikes (80,000-120,000 VND/day) or bicycles. Grab works well. Walking connects the main beaches and seafood restaurants along the shore.",
    },
    faqs: [
      {
        question: "How many days should I spend in Vung Tau?",
        answer: "1-2 days is enough for most travelers - it's really a beach escape, not a destination. Weekends get crowded with HCMC visitors. Weekdays are much calmer and better value.",
      },
      {
        question: "What is the best time to visit Vung Tau?",
        answer: "November to April is dry season with better beach weather. May-October brings rain but warm temperatures. Weekdays any time beat weekends when HCMC empties onto the beaches.",
      },
      {
        question: "Is Vung Tau safe for tourists?",
        answer: "Generally safe, though beaches get crowded and petty theft can occur. Swimming conditions vary - some beaches have strong currents. The coastal road has busy traffic on weekends.",
      },
      {
        question: "Where should I stay in Vung Tau?",
        answer: "Back Beach has the best swimming beach and most tourist facilities. Front Beach is calmer but water isn't great for swimming. Budget hotels cluster near Back Beach; fancier resorts line the coast road.",
      },
    ],
  },
};

/**
 * Get content for a specific destination
 * Returns destination-specific content if available and has content,
 * otherwise returns fallback content
 */
export function getDestinationContent(slug: string): DestinationContent {
  const content = destinationContent[slug];

  // If no content exists for this destination, use fallback
  if (!content) {
    return fallbackContent;
  }

  // Merge with fallback - use destination content if it has values, otherwise fallback
  return {
    status: content.status,
    overview: content.overview.length > 0 ? content.overview : fallbackContent.overview,
    thingsToDo: content.thingsToDo.length > 0 ? content.thingsToDo : fallbackContent.thingsToDo,
    gettingAround: {
      byAir: content.gettingAround.byAir || fallbackContent.gettingAround.byAir,
      byTrain: content.gettingAround.byTrain || fallbackContent.gettingAround.byTrain,
      local: content.gettingAround.local || fallbackContent.gettingAround.local,
    },
    faqs: content.faqs.length > 0 ? content.faqs : fallbackContent.faqs,
  };
}

/**
 * Get content status summary for all destinations
 * Useful for tracking which destinations need content
 */
export function getContentStatusSummary(): { slug: string; status: string }[] {
  return Object.entries(destinationContent).map(([slug, content]) => ({
    slug,
    status: content.status,
  }));
}
