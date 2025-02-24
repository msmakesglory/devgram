import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Sun, Moon, LaptopMinimal } from "lucide-react";
import {useTheme} from "@/context/ThemeProvider.jsx";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const themeArray = [
        {
            value: "system",
            icon: LaptopMinimal,
        },
        {
            value: "light",
            icon: Sun,
        },
        {
            value: "dark",
            icon: Moon,
        }
    ];

    return (
        <ToggleGroup
            type="single"
            value={theme}
            onValueChange={(value) => value && setTheme(value)}
        >
            {themeArray.map((item, index) => (
                <ToggleGroupItem
                    value={item.value}
                    aria-label={`Toggle ${item.value}`}
                    key={index}
                >
                    <item.icon className="h-4 w-4" />
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
