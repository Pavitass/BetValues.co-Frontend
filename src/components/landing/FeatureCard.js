import Image from 'next/image';

function FeatureCard({ title, description, media, mediaType }) {
  return (
    <div className="bg-[#2d2d2d] text-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300">
      <div className="relative">
        {mediaType === 'video' ? (
          <video className="w-full h-full object-cover" autoPlay muted loop>
            <source src={media} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
          src={media}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
          priority
        />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
        <p className="text-base md:text-lg">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
