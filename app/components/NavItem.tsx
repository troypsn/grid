import Image from "next/image"

interface NavItemProps {
  styling: string;
  image: string;
  imageAlt: string;
  navLabel: string;
  navLink: string;
}

function navItem( {
        styling,
        image,
        imageAlt,
        navLabel,
        navLink,
        }: NavItemProps) {
  return (
    <a href={navLink}>
        <div className={`${styling} flex flex-col items-center justify-center`}>


                <Image src={`/${image}`} 
                        alt={imageAlt} 
                        width={400} 
                        height={400}
                         className=""
                    />
            <p className="text-black font-kodeMono">{navLabel}</p>
        </div>
    </a>
  )
}

export default navItem