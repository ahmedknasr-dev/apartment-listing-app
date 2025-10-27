import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sample data for apartments
const cities = [
  'Cairo',
  'Alexandria',
  'Giza',
  'Sharm El-Sheikh',
  'Hurghada',
  'Luxor',
  'New Cairo',
  '6th of October',
];
const projects = [
  'Palm Hills',
  'Madinaty',
  'New Giza',
  'Hyde Park',
  'Mivida',
  'Mountain View',
  'Sodic West',
  'Al Rehab',
  'Heliopolis Gardens',
  'Sheikh Zayed Gardens',
];

// Unsplash apartment/interior images - Free to use
const apartmentImages = [
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
  'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
  'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
  'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800',
  'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800',
  'https://images.unsplash.com/photo-1585821569331-f071db2abd8d?w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
  'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=800',
];

// Descriptions for apartments
const descriptions = [
  'Luxurious apartment with modern amenities and stunning city views. Features high-end finishes and spacious living areas.',
  'Cozy and comfortable living space in a prime location. Perfect for families with excellent schools nearby.',
  'Modern design with state-of-the-art facilities. Includes gym, swimming pool, and 24/7 security.',
  'Spacious apartment with natural lighting throughout. Large balcony with panoramic views.',
  'Elegant residence in a premium compound. Features include smart home technology and premium fixtures.',
  'Beautiful apartment with contemporary architecture. Close to shopping centers and entertainment venues.',
  'Stunning property with premium finishes. Enjoy access to clubhouse, parks, and recreational facilities.',
  'Well-maintained apartment in a peaceful neighborhood. Great for professionals and small families.',
  'Charming unit with excellent layout and design. Features include built-in wardrobes and modern kitchen.',
  'Premium apartment with luxurious amenities. Walking distance to metro station and major landmarks.',
];

// Helper function to get random items from array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to get random item from array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to generate random number in range
function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate random float in range
function randomFloatInRange(min: number, max: number, decimals = 2): number {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(decimals));
}

// Generate apartment data
function generateApartment(_index: number) {
  const city = getRandomItem(cities);
  const project = getRandomItem(projects);
  const bedrooms = randomInRange(1, 5);
  const bathrooms = randomInRange(1, bedrooms);
  const area = randomFloatInRange(80, 350);
  const pricePerMeter = randomFloatInRange(15000, 50000);
  const price = parseFloat((area * pricePerMeter).toFixed(2));
  const imageCount = randomInRange(3, 6);
  const images = getRandomItems(apartmentImages, imageCount);
  const available = Math.random() > 0.2; // 80% available
  const now = new Date().toISOString();

  // Create unit number (e.g., "A-101", "B-205")
  const building = String.fromCharCode(65 + randomInRange(0, 4)); // A-E
  const floor = randomInRange(1, 15);
  const unit = randomInRange(1, 8);
  const unitNumber = `${building}-${floor}0${unit}`;

  return {
    unitName: `${project} ${unitNumber}`,
    unitNumber,
    project,
    description: getRandomItem(descriptions),
    address: `${randomInRange(1, 100)} ${project} Street, ${city}`,
    city,
    price,
    bedrooms,
    bathrooms,
    area,
    images,
    available,
    createdAt: now,
    updatedAt: now,
  };
}

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🗑️  Clearing existing apartments...');
  await prisma.apartment.deleteMany({});

  // Generate and insert apartments
  const numberOfApartments = 50; // You can adjust this number
  console.log(`📦 Generating ${numberOfApartments} apartments...`);

  const apartments = Array.from({ length: numberOfApartments }, (_, index) =>
    generateApartment(index),
  );

  // Insert apartments in batches
  const batchSize = 10;
  for (let i = 0; i < apartments.length; i += batchSize) {
    const batch = apartments.slice(i, i + batchSize);
    await prisma.apartment.createMany({
      data: batch,
    });
    console.log(
      `✅ Inserted apartments ${i + 1}-${Math.min(i + batchSize, apartments.length)}`,
    );
  }

  // Get statistics
  const total = await prisma.apartment.count();
  const available = await prisma.apartment.count({
    where: { available: true },
  });
  const citiesWithApartments = await prisma.apartment.groupBy({
    by: ['city'],
    _count: true,
  });

  console.log('\n📊 Seeding Statistics:');
  console.log(`   Total apartments: ${total}`);
  console.log(`   Available: ${available}`);
  console.log(`   Unavailable: ${total - available}`);
  console.log('\n🏙️  Apartments by city:');
  citiesWithApartments.forEach((city) => {
    console.log(`   ${city.city}: ${city._count} apartments`);
  });

  console.log('\n✨ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
