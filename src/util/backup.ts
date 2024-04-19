import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Função para fazer backup do banco de dados
export async function fazerBackupMongoDB() {
    const nomeBancoDados = 'ti_system';
    const pastaBackup = './backup';
    const arquivoUltimoBackup = path.join(pastaBackup, 'ultimobackup.txt');

    // Verifica se existe um arquivo de registro do último backup
    if (fs.existsSync(arquivoUltimoBackup)) {
        // Lê a data do último backup do arquivo
        const ultimaDataBackup = new Date(fs.readFileSync(arquivoUltimoBackup, 'utf-8').trim());

        // Consulta o banco de dados para verificar se há dados modificados desde o último backup
        // Aqui você precisa implementar a lógica para verificar a data de modificação dos documentos no banco de dados

        // Se houver dados modificados desde o último backup, faz o backup novamente
        const comandoBackup = `mongodump --db ${nomeBancoDados} --out ${pastaBackup}`;
        exec(comandoBackup, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao fazer o backup do banco de dados: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Erro de saída padrão: ${stderr}`);
                return;
            }
            console.log(`Backup do banco de dados concluído: ${stdout}`);

            // Atualiza o arquivo de registro do último backup com a data e hora atual
            fs.writeFileSync(arquivoUltimoBackup, new Date().toISOString());
            console.log('Registro do último backup atualizado.');
        });
    } else {
        console.log('Não há registro do último backup. Fazendo backup completo.');
        // Se não houver registro do último backup, faz um backup completo do banco de dados
        const comandoBackup = `mongodump --db ${nomeBancoDados} --out ${pastaBackup}`;
        exec(comandoBackup, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao fazer o backup do banco de dados: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Erro de saída padrão: ${stderr}`);
                return;
            }
            console.log(`Backup do banco de dados concluído: ${stdout}`);

            // Cria um arquivo de registro do último backup com a data e hora atual
            fs.writeFileSync(arquivoUltimoBackup, new Date().toISOString());
            console.log('Registro do último backup criado.');
        });
    }
}

// Chama a função de fazer backup do banco de dados
fazerBackupMongoDB();