# 🐕 Dog App - Random Dog Gallery

A beautiful React application that displays random dog images with their breeds using the [Dog CEO API](https://dog.ceo/dog-api/).

## Features

- **Featured Random Dog**: Displays a large random dog image with breed information at the top
- **Dog Gallery**: Shows 10 random dog thumbnails with their breed names
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient backgrounds, smooth animations, and clean design
- **Loading States**: Elegant loading animations while fetching data
- **Error Handling**: Graceful error handling with retry functionality
- **Refresh Functionality**: Easy refresh buttons to get new random dogs

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **Dog CEO API** - Free API for dog images and breed information

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /Users/viktoria/WebstormProjects/dog-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   The app will automatically open at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
dog-app/
├── public/
├── src/
│   ├── components/
│   │   ├── RandomDog.jsx      # Featured dog component
│   │   └── DogGrid.jsx        # Dog gallery grid component
│   ├── services/
│   │   └── dogApi.js          # API service functions
│   ├── App.jsx                # Main app component
│   ├── App.css                # App-specific styles
│   ├── index.css              # Global styles
│   └── main.jsx               # App entry point
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── README.md                  # This file
```

## API Integration

The app integrates with the Dog CEO API:

- **Breeds List**: `https://dog.ceo/api/breeds/list/all` - Gets all available breeds
- **Random Image**: `https://dog.ceo/api/breeds/image/random` - Gets a random dog image
- **Breed Images**: `https://dog.ceo/api/breed/{breed}/images/random` - Gets random image for specific breed

## Features in Detail

### Featured Random Dog
- Displays a large, high-quality random dog image
- Shows the breed name extracted from the image URL
- "Get Another Dog" button to refresh with a new random dog
- Responsive image sizing

### Dog Gallery
- Grid layout showing 10 random dogs from different breeds
- Each card shows the dog image, breed name, and a number
- "Refresh Gallery" button to load 10 new random dogs
- Responsive grid that adapts to screen size

### User Experience
- Smooth loading animations
- Hover effects on images and buttons
- Error handling with retry options
- Mobile-friendly responsive design
- Beautiful gradient backgrounds

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Dog CEO API](https://dog.ceo/dog-api/) for providing the free dog images and breed data
- [Inter Font](https://fonts.google.com/specimen/Inter) for the beautiful typography
- React community for the amazing ecosystem
