import profileIcon from '../assets/profile.png';

const SIZES = {
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
};

interface AvatarProps {
  name: string;
  size?: keyof typeof SIZES;
}

export default function Avatar({ name, size = 'md' }: AvatarProps) {
  return (
    <img
      src={profileIcon}
      alt={`Foto profil ${name}`}
      className={`shrink-0 rounded-full bg-white object-cover ${SIZES[size]}`}
    />
  );
}