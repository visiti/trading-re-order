import { KLineData, TechnicalIndicatorPlotCallbackData, TechnicalIndicatorTemplate } from 'klinecharts';
export const _VOL:TechnicalIndicatorTemplate = {
    name: "MMVOL",
    series: "volume",
    shouldFormatBigNumber: true,
    plots: [
        {
            key: "volume",
            title: "MMVOL: ",
            type: "bar",
            color: (data: TechnicalIndicatorPlotCallbackData, options: { bar: { downColor: any; upColor: any; }; }) => {
                const kLineData = data.current?.kLineData!

                if (kLineData.close < kLineData.open) {
                    return "#EF5350"
                }
                return "#26A69A"
            }
        }
    ],
    calcTechnicalIndicator: (dataList: KLineData[]) =>
        dataList.map((kLineData) => ({
            volume: kLineData.volume
        })),
    precision: 4,
    minValue: 0
}