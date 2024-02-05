import moment from 'moment';
//TODO someone to implement unit tests
export class TimeUtil {
  public static getUnixTimeForAFutureDay(days: number): number {
    return moment().add(days, 'days').unix();
  }
}

export const formatDate = (date: Date) => {
  // Extraia o dia, mês e ano da data
  const dia = ('0' + date.getDate()).slice(-2);
  const mes = ('0' + (date.getMonth() + 1)).slice(-2);
  const ano = date.getFullYear();
  // Formate a data como DDMMYYYY
  const dataFormatada = `${dia}-${mes}-${ano}`;
  return dataFormatada;
};
