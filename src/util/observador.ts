export interface Observer {
    onInsert(data: any): void;
}

export function configurarObservador(observer: Observer) {
    const observador = {
        on: (event: string, callback: (data: any) => void) => {
            if (event === 'insert') {
                observer.onInsert = callback;
            }
        }
    };

    // Simula a detecção de uma inserção de documento
    setInterval(() => {
        // Gera dados fictícios
        const novoDocumento = { id: Math.random(), data: new Date() };
        // Chama a função do observador quando há uma inserção de documento
        observer.onInsert(novoDocumento);
    }, 36000); // A cada 5 segundos
}