import Image from "next/image";
import { type ReactNode } from "react";

interface SocialIconProps {
  readonly className?: string;
}

interface SocialIconImageProps extends SocialIconProps {
  readonly alt: string;
  readonly src: string;
}

function SocialIconImage({
  className,
  alt,
  src,
}: SocialIconImageProps): ReactNode {
  return (
    <Image
      src={src}
      alt={alt}
      width={24}
      height={24}
      className={className}
      priority={false}
    />
  );
}

export function FacebookIcon({ className }: SocialIconProps) {
  return (
    <SocialIconImage
      className={className}
      alt="Facebook"
      src="/images/social/facebook.svg"
    />
  );
}

export function InstagramIcon({ className }: SocialIconProps) {
  return (
    <SocialIconImage
      className={className}
      alt="Instagram"
      src="/images/social/instagram.svg"
    />
  );
}

export function TwitterIcon({ className }: SocialIconProps) {
  return (
    <SocialIconImage
      className={className}
      alt="Twitter"
      src="/images/social/twitter.svg"
    />
  );
}
