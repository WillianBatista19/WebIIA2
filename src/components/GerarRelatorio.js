import React, { Component } from 'react';
import './GerarRelatorio.css';

class GerarRelatorio extends Component {
  gerarRelatorioPDF = () => {
    const cidade = "Crato";
    fetch(`/relatorio/cidade/${cidade}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'relatorio.pdf');
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Erro ao gerar relatório em PDF:', error);
      });
  };

  render() {
    return (
      <div className="gerar-relatorio-container">
        <button className="gerar-relatorio-button" onClick={this.gerarRelatorioPDF}>
          Gerar Relatório em PDF
        </button>
      </div>
    );
  }
}

export default GerarRelatorio;
