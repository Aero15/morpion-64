export default interface IPaginationItem {
    variant: 'number' | 'icon'
    number?: number;
    icon?: string;
    title: string;
    path: string;
}