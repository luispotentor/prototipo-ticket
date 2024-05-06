

import Link from "next/link";
import { ForwardRefExoticComponent, SVGProps } from "react";

interface PropsIconLinkButton {
  icon:ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> >;
  clickFunc?:  () => void;
  textColor?: string;
  hoverTextColor?:string;
  hoverBgColor?:string;
  size?:number;
  toolTip?:string;
  link:string;

}
export const IconLinkButton:React.FC<PropsIconLinkButton> = ({
  icon,
  clickFunc,
  textColor = 'text-indigo-300',
  hoverTextColor = 'text-blue-600',
  hoverBgColor = '',
  size = 4,
  toolTip,
  link
}) => {

  
  const Icon = icon;
  const handleClick = () => {

    if ( clickFunc ) {
      clickFunc();
    }
  }

  return (
    <Link href={link} onClick={handleClick}  >
      <div className={`p-2 rounded-lg cursor-pointer hover:${hoverBgColor}`} >
        <Icon className={` w-${size} h-${size} ${textColor} hover:${hoverTextColor}`} />
      </div>
    </Link>
  )
}
