export function formatThaiTimestamp(isoTimestamp: string): string {
    const date = new Date(isoTimestamp);
    
    const thaiMonths = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    
    const thaiYear = date.getFullYear() + 543;
    const thaiDate = `${date.getDate()} ${thaiMonths[date.getMonth()]} ${thaiYear}`;
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? ' น.' : ' น.';
    hours %= 12;
    hours = hours || 12;
    const thaiTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}${ampm}`;
    
    return `${thaiDate} ${thaiTime}`;

}