import { IReservation } from "../../interfaces/generoInterface";
import { Reservation } from "../model/Reservation";
import { startOfMonth, endOfMonth, subMonths } from 'date-fns'; // Library for date handling
import { Participant } from '../model/ParticipantSchema';
class InicialData {
    private async calculateTotalForPeriod(startDate: Date, endDate: Date): Promise<{ reservasQuantity: number, reservasAvailableBalance: number }> {
        // Fetching reservations created within the period
        const reservations = await Reservation.find({
            createdAt: { // Using createdAt for date filter
                $gte: startDate,
                $lte: endDate
            }
        }).lean();
        const reservasAvailableBalance = reservations.reduce((sum, reservation) => sum + (reservation.price || 0), 0);
        const reservasQuantity = reservations.length;

        return { reservasQuantity, reservasAvailableBalance };
    }

    private async calculateTotalGeneral(): Promise<{ reservasQuantity: number, reservasAvailableBalance: number }> {
        const reservations = await Reservation.find().lean();
        const reservasAvailableBalance = reservations.reduce((sum, reservation) => sum + (reservation.price || 0), 0);
        const reservasQuantity = reservations.length;

        return { reservasQuantity, reservasAvailableBalance };
    }
    private async generateAtleta(): Promise<{ participant: number }> {
        const reservations = await Participant.find();
        return { participant: reservations.length };
    }

    public async monthlySummary() {
        try {
            const now = new Date();
            const startOfCurrentMonth = startOfMonth(now);
            const endOfCurrentMonth = endOfMonth(now);
            const previousMonthDate = subMonths(now, 1);
            const startOfPreviousMonth = startOfMonth(previousMonthDate);
            const endOfPreviousMonth = endOfMonth(previousMonthDate);
            const { reservasQuantity: reservasQuantityCurrentMonth, reservasAvailableBalance: reservasAvailableBalanceCurrentMonth } = await this.calculateTotalForPeriod(startOfCurrentMonth, endOfCurrentMonth);
            const { reservasQuantity: reservasQuantityPreviousMonth, reservasAvailableBalance: reservasAvailableBalancePreviousMonth } = await this.calculateTotalForPeriod(startOfPreviousMonth, endOfPreviousMonth);

            // Calculating the general total
            const { reservasQuantity: reservasQuantityTotal, reservasAvailableBalance: reservasAvailableBalanceTotal } = await this.calculateTotalGeneral();

            return {
                reservasQuantityCurrentMonth,
                reservasAvailableBalanceCurrentMonth,
                reservasQuantityPreviousMonth,
                reservasAvailableBalancePreviousMonth,
                reservasQuantityTotal,
                reservasAvailableBalanceTotal,
                participant: (await this.generateAtleta()).participant
            };
        } catch (error) {
            throw new Error(`Error calculating monthly summary: ${(error as Error).message}`);
        }
    }

    // Method to return the monthly summary, simplifying the call
    public async getReservationSummaryByCurrentMonth() {
        try {
            return await this.monthlySummary();
        } catch (error) {
            throw new Error(`Error calculating monthly summary for the current month: ${(error as Error).message}`);
        }
    }
}

export default new InicialData();
