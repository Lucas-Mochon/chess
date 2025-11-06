import * as AiIcons from 'react-icons/ai';
import * as CiIcons from 'react-icons/ci';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as DiIcons from 'react-icons/di';
import * as FaIcons from 'react-icons/fa';
import * as FcIcons from 'react-icons/fc';
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as GoIcons from 'react-icons/go';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import * as IoIcons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as TbIcons from 'react-icons/tb';
import * as TiIcons from 'react-icons/ti';
import * as VscIcons from 'react-icons/vsc';
import * as PiIcons from 'react-icons/pi';
import * as CgIcons from 'react-icons/cg';
import * as LiaIcons from "react-icons/lia";

export const iconSets = {
    Ai: AiIcons,
    Bi: BiIcons,
    Bs: BsIcons,
    Di: DiIcons,
    Fa: FaIcons,
    Fc: FcIcons,
    Fi: FiIcons,
    Gi: GiIcons,
    Go: GoIcons,
    Gr: GrIcons,
    Hi: HiIcons,
    Im: ImIcons,
    Io: IoIcons,
    Io5: Io5Icons,
    Md: MdIcons,
    Ri: RiIcons,
    Si: SiIcons,
    Tb: TbIcons,
    Ti: TiIcons,
    Vsc: VscIcons,
    Pi: PiIcons,
    Cg: CgIcons,
    Ci: CiIcons,
    Lia: LiaIcons,
};

interface CustomIconProps {
    name: string;
    size?: number;
    color?: string;
    className?: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({ name, size, color, className }) => {
    const getIconComponent = (iconName: string): React.ComponentType<any> | null => {
        if (!iconName) return null;
        let prefix = iconName.slice(0, 3);
        let set = iconSets[prefix as keyof typeof iconSets];
        if (!set) {
            prefix = iconName.slice(0, 2);
            set = iconSets[prefix as keyof typeof iconSets];
        }
        if (!set) return null;
        return set[iconName as keyof typeof set] as React.ComponentType<any>;
    };

    const IconComponent = getIconComponent(name);
    if (!IconComponent) return null;

    const props: React.ComponentProps<typeof IconComponent> = {};
    if (size != null) props.size = size;
    if (color) props.color = color;
    if (className) props.className = className;

    return <IconComponent {...props} />;
};

export default CustomIcon;