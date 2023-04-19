export const mmDdYyFormat = (value: any) => {
    const date = new Date(value);

    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate();
    const yyyy = date.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
};