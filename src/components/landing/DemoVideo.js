
function DemoVideo({ className }) {
  return (
    <div className={`relative bg-gray-800 rounded-lg overflow-hidden w-full ${className}`}>
      <video className="w-full h-full object-cover" autoPlay muted loop>
        <source src="https://via.placeholder.com/800x600.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <p className="text-white text-lg">Watch our demo video here!</p>
      </div>
    </div>
  );
}

export default DemoVideo;
