interface SectionHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  subtitle,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <p className={`text-xs font-semibold tracking-[0.25em] uppercase mb-3 font-inter
        ${light ? 'text-brand-orange' : 'text-brand-orange'}`}>
        {subtitle}
      </p>
      <h2 className={`font-poppins font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4
        ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {description && (
        <p className={`font-inter text-base md:text-lg max-w-2xl leading-relaxed
          ${centered ? 'mx-auto' : ''}
          ${light ? 'text-blue-100' : 'text-gray-500'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
