export const books = [
  { id: 1, title: 'The Creative Act', author: 'Rick Rubin', category: 'Creativity', price: 24, oldPrice: 28, badge: 'BESTSELLER', cover: 'photo-1544947950-fa07a98d237f', tone: 'peach', rating: '4.9' },
  { id: 2, title: 'Crying in H Mart', author: 'Michelle Zauner', category: 'Memoir', price: 18.5, cover: 'photo-1512820790803-83ca734da794', tone: 'green', rating: '4.8' },
  { id: 3, title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', category: 'Fiction', price: 21, badge: 'BOOK CLUB PICK', cover: 'photo-1543002588-bfa74002ed7e', tone: 'blue', rating: '4.9' },
  { id: 4, title: 'Braiding Sweetgrass', author: 'Robin Wall Kimmerer', category: 'Nature', price: 19.95, cover: 'photo-1519682337058-a94d519337bc', tone: 'yellow', rating: '5.0' },
  { id: 5, title: 'The Song of Achilles', author: 'Madeline Miller', category: 'Fiction', price: 17, cover: 'photo-1516979187457-637abb4f9353', tone: 'red', rating: '4.8' },
  { id: 6, title: 'A Field Guide to Getting Lost', author: 'Rebecca Solnit', category: 'Essays', price: 16, badge: 'STAFF FAVORITE', cover: 'photo-1511108690759-009324a90311', tone: 'lilac', rating: '4.7' },
  { id: 7, title: 'Small Things Like These', author: 'Claire Keegan', category: 'Fiction', price: 15.5, cover: 'photo-1512820790803-83ca734da794', tone: 'blue', rating: '4.8' },
  { id: 8, title: 'How to Do Nothing', author: 'Jenny Odell', category: 'Culture', price: 20, cover: 'photo-1544947950-fa07a98d237f', tone: 'green', rating: '4.6' },
];

export const categories = ['Everything', 'Fiction', 'Memoir', 'Creativity', 'Nature', 'Essays', 'Culture'];

export const orders = [
  { id: 'PT-2048', placedAt: '2026-10-06', placedLabel: 'Oct 6, 2026', status: 'In transit', titles: ['The Creative Act', 'Braiding Sweetgrass'], cover: 'photo-1544947950-fa07a98d237f', itemCount: 2, total: 43.95, update: 'Your books are on their way to the local delivery hub.', tracking: 'PTX 4028 1164', delivery: 'Expected Oct 12–14' },
  { id: 'PT-1982', placedAt: '2026-09-21', placedLabel: 'Sep 21, 2026', status: 'Delivered', titles: ['Crying in H Mart'], cover: 'photo-1512820790803-83ca734da794', itemCount: 1, total: 18.5, update: 'Delivered to your doorstep on Oct 2, 2026.', tracking: 'PTX 3195 8402', delivery: 'Delivered Oct 2, 2026' },
  { id: 'PT-1931', placedAt: '2026-09-08', placedLabel: 'Sep 8, 2026', status: 'Delivered', titles: ['The Song of Achilles', 'Small Things Like These'], cover: 'photo-1516979187457-637abb4f9353', itemCount: 2, total: 32.5, update: 'Delivered to your doorstep on Sep 13, 2026.', tracking: 'PTX 2844 7120', delivery: 'Delivered Sep 13, 2026' },
];

export const orderFilters = ['All orders', 'In transit', 'Delivered'];

export const imageUrl = (id, width = 560) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;