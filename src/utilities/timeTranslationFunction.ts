function timeTranslate(createdAt: string): string {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
        'سال': 31536000,
        'ماه': 2592000,
        'روز': 86400,
        'ساعت': 3600,
        'دقیقه': 60,
        'ثانیه': 1
    };

    let timeAgoString = '';
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {

            if (unit === 'روز' && interval < 1) continue;
            if (unit === 'ماه' && interval < 1) continue;
            if (unit === 'سال' && interval < 1) continue;
            if (unit === 'ساعت' && interval < 1) continue;
            if (unit === 'دقیقه' && interval < 1) continue;
            
            timeAgoString = `${interval} ${unit} پیش`;

            if (unit === 'روز' || unit === 'ماه' || unit === 'سال') break;
            if (unit === 'ساعت' || unit === 'دقیقه') break;
        }
    }

    return timeAgoString || "همین الان";
}

export default timeTranslate;
