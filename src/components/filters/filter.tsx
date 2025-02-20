import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export type SidebarFilterProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  type: string;
};

export const SidebarFilter = ({
  children,
  trigger,
  type,
}: SidebarFilterProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={type}>
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
