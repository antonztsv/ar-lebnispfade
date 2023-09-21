const documentHeader = require('./components/head.11ty');


exports.render = function(data){
    const documentHead = documentHeader.getHeader(this, data);
    return `<!doctype html>
    <html lang="de">
      ${documentHead}
      <body class="impressum">
        <main>
        <h1>VHS Oberberg</p>
        <p>Oberbergischer Kreis</p>
        <p>Der Landrat</p>
        <p>Moltkestraße 42</p>
        <p>51643 Gummersbach</p>
        <p></p>
        <p>Telefon-Zentrale: 02261 88-0</p>
        <p>E-Mail: mail@obk.de</p>
        <p>www.obk.de</p>
        <p>Verantwortlich für den Inhalt:</p>
        <p>Oberbergischer Kreis</p>
        <p>Der Landrat</p>
        <p>Volkshochschule Oberberg</p>
        <p></p>
        <p>Vertreten durch:</p>
        <p>Michael Beiderwellen (Leiter der Volkshochschule Oberberg)</p>
        <p></p>
        <p>im Amt für Schule und Bildung</p>
        <p>Mühlenbergweg 3</p>
        <p>51645 Gummersbach</p>
        <p></p>
        <p>Telefon: 02261 8190-0</p>
        <p>Fax: 02261 8190-27</p>
        <p>E-Mail: infovhs@obk.de</p>
        <p>www.vhs-oberberg.de</p>
        <p>Hinweise zu Links</p>
        <p>Als Inhaltsanbieter ist der Oberbergische Kreis nach § 7 Abs. 1 und 2 des Telemediengesetzes – TMG – vom 26.02.2007 (BGBl. I, Seite 179) für die „eigenen Inhalte“, die er zur Nutzung bereit hält, nach den allgemeinen Gesetzen verantwortlich. Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
        <p>Von diesen eigenen Inhalten sind Querverweise („Links“) auf die von anderen Anbieterinnen und Anbietern bereitgehaltenen Inhalte zu unterscheiden. Einen Querverweis auf fremde Inhalte erkennen Sie dadurch, dass sich immer ein neues Fenster öffnet mit der Internetadresse des jeweiligen Anbieters bzw. der Anbieterin. Für diese fremden Inhalte ist der Oberbergische Kreis nur dann verantwortlich, wenn er von ihnen (das heißt auch von einem rechtswidrigen beziehungsweise strafbaren Inhalt) positive Kenntnis erlangt hat und es dem Oberbergischen Kreis technisch möglich und zumutbar ist, deren Nutzung zu verhindern. Bei „Links“ handelt es sich um dynamische Verweisungen. Der Oberbergische Kreis hat bei der erstmaligen Verknüpfung zwar den fremden Inhalt daraufhin überprüft, ob durch ihn eine mögliche zivilrechtliche oder strafrechtliche Verantwortlichkeit ausgelöst wird. Der Oberbergische Kreis ist aber nach dem Teledienstegesetz nicht verpflichtet, die Inhalte, auf die er in seinem Angebot verweist, ständig auf Veränderungen zu überprüfen, die eine Verantwortlichkeit neu begründen könnten (§ 8 Abs. 2 TDG). Erst wenn der Oberbergische Kreis feststellt oder von anderen darauf hingewiesen wird, dass ein konkretes Angebot, zu dem er einen „Link“ bereitgestellt hat, eine zivil- oder strafrechtliche Verantwortlichkeit auslöst, wird der Oberbergische Kreis den „Link“ auf dieses Angebot aufheben, soweit ihm dies technisch möglich und zumutbar ist.</p>
        <p>Hinweise zu E-Mails</p>
        <p>Der E-Mail-Dienst des Oberbergischen Kreises dient ausschließlich der dienstlichen Kommunikation.</p>
        <p>Senden Sie deshalb keine E-Mails privaten Inhalts an E-Mail-Adressen des Oberbergischen Kreises.</p>
        <p>Es wird darauf hingewiesen, dass neben der Person, an welche Ihre E-Mail gerichtet ist, auch deren Vertretung im Amt einen unmittelbaren Zugriff auf Ihre Nachricht hat. Für Berufsgeheimnisträger und besondere Funktionsträger gelten abweichende Regelungen.</p>
        <p>Es wird außerdem darauf hingewiesen, dass die Kommunikation per E-Mail ohne Authentifizierung und Verschlüsselung unsicher ist, da für unberechtigte Dritte grundsätzlich die Möglichkeit der Kenntnisnahme und Manipulation besteht. Beachten Sie bitte:</p>
        <p>Die Mail-Hinweise im Internet sind über Java-Script realisiert. Sie müssen im Internet-Explorer Active-Scripting aktiviert haben, um diese E-Mails nutzen zu können.</p>
        <p>Datenschutzerklärung</p>
        <p>Bei jedem Zugriff auf Inhalte dieses Internetangebots werden folgende Daten gespeichert:</p>
        <p>·      Name der angeforderten Datei</p>
        <p>·      Datum und Uhrzeit der Anforderung</p>
        <p>·      übertragene Datenmenge</p>
        <p>·      Meldung, ob der Abruf erfolgreich war</p>
        <p>·      IP-Nummer des anfragenden Rechners</p>
        <p>·      Versionsangaben zu Ihrem Browser</p>
        <p>Die Daten sind nicht personenbezogen. Sie werden ausschließlich zu statistischen Zwecken ausgewertet.</p>
        <p>Die Seite verwendet keine Cookies. Es werden auch keine anderen Techniken eingesetzt, die Rückschlüsse auf das Zugriffsverhalten von Nutzerinnen und Nutzern ermöglichen.</p>
        <p>Noch weitere Fragen?</p>
        <p>Sollten Sie noch weitere Informationen benötigen oder noch Fragen haben, dann wenden Sie sich bitte vertrauensvoll per E-Mail an den Mitarbeiter des Oberbergischen Kreises für Angelegenheiten des Datenschutzes:</p>
        <p></p>
        <p>Uwe Kaldeich</p>
        <p>Angelegenheiten des Datenschutzes</p>
        <p>Oberbergischer Kreis</p>
        <p>Der Landrat</p>
        <p>Moltkestraße 42</p>
        <p>51643 Gummersbach</p>
        <p>Telefon: 02261 / 88-1287</p>
        <p>Telefax: 02261 / 88-972 1288</p>
        <p>E-mail: datenschutz@obk.de</p>
        <p>Kommentare und Fragen zu diesen Richtlinien sind uns jederzeit willkommen.</p>
        <p>Stand: 24.05.2018</p>
        <p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RstV: Renée Scheer, zu erreichen, wie oben angegeben.</p>
        <p>Streitbeilegung für Verbraucher:</p>
        <p>Die Plattform der EU-Kommission zur Online-Streitbeilegung ist unter folgendem Link erreichbar:</p>
        <p>http://ec.europa.eu/consumers/odr/</p>
        <p>Die Volkshochschule des Oberbergischen Kreises ist eine gemeinnützige, nicht rechtsfähige öffentliche Einrichtung in der Unterhaltungsträgerschaft des Oberbergischen Kreises und beteiligt sich grundsätzlich nicht an Streitbeilegungsverfahren. Hier kommt das Verfahren des Oberbergischen Kreises zur Anwendung.</p>
        <p>Urheberrechtshinweis:</p>
        <p>Die VHS Oberberg behält sich alle Rechte an dieser Webseite und ihren Inhalten vor. Sie ist entweder Urheber oder hat sich die entsprechenden Nutzungsrechte einräumen lassen.</p>
        </main>
      </body>
    </html>
    `
}