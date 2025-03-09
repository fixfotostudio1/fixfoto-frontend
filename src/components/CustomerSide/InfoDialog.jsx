import Modal from "react-bootstrap/Modal";
import loc from "../../assets/location.png";

const InfoDialog = ({ dialogType }) => {
	switch (dialogType) {
		case "AGBDialog":
			return (
				<>
					<Modal.Header closeButton>
						<Modal.Title>
							Allgemeine Geschäftsbedingungen (AGB) „Fotografie“ von Fix Foto
							Studio1 Frankfurt
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						I. Allgemeines
						<br />
						<br /> 1. Die nachfolgenden AGB gelten für alle an Fix Foto Studio1
						erteilten Aufträge. Sie gelten als vereinbart, wenn ihnen nicht
						umgehend widersprochen wird.
						<br />
						<br />
						2. „Lichtbilder“ im Sinne dieser AGB sind alle vom Fotografen
						hergestellten Produkte, gleich in welcher technischen Form oder in
						welchem Medium sie erstellt wurden oder vorliegen. (Negative,
						Dia-Positive, Papierbilder, Still-Videos, elektronische Stehbilder
						in digitalisierter Form, Videos usw.)
						<br />
						<br />
						II. Urheberrecht
						<br />
						<br />
						1. Dem Fotografen steht das Urheberrecht an den Lichtbildern nach
						Massgabe des Urheberrechtsgesetzes zu.
						<br />
						<br />
						2. Die vom Fotografen hergestellten Lichtbilder sind grundsätzlich
						nur für den eigenen Gebrauch des Auftraggebers bestimmt.
						<br />
						<br />
						3. Überträgt der Fotograf Nutzungsrechte an seinen Werken, ist –
						sofern nicht ausdrücklich etwas anderes vereinbart wurde – jeweils
						nur das einfache Nutzungsrecht übertragen. Eine Weitergabe von
						Nutzungsrechten bedarf der besonderen Vereinbarung.
						<br />
						<br />
						4. Die Nutzungsrechte gehen erst über nach vollständiger Bezahlung
						des Honorars an den Fotografen.
						<br />
						<br />
						5. Der Besteller eines Bildes i.S. vom § 60 UrhG hat kein Recht, das
						Lichtbild zu vervielfältigen und zu verbreiten, wenn nicht die
						entsprechenden Nutzungsrechte übertragen worden sind. § 60 UrhG wird
						ausdrücklich abbedungen.
						<br />
						<br />
						6. Bei der Verwertung der Lichtbilder kann der Fotograf, sofern
						nichts anderes vereinbart wurde, verlangen, als Urheber des
						Lichtbildes genannt zu werden. Eine Verletzung des Rechts auf
						Namensnennung berechtigt den Fotografen zum Schadensersatz.
						<br />
						<br />
						7. Die Negative bzw. Digitalen Daten verbleiben beim Fotografen.
						Eine Herausgabe der Negative oder Digitalen Daten an den
						Auftraggeber erfolgt nur bei gesonderter Vereinbarung.
						<br />
						<br />
						III. Vergütung, Eigentumsvorbehalt
						<br />
						<br />
						1. Für die Herstellung der Lichtbilder wird ein Honorar als
						Stundensatz, Tagessatz oder vereinbarte Pauschale zuzüglich der
						gesetzlichen Mehrwertsteuer berechnet; Nebenkosten (Reisekosten,
						Modellhonorare, Spesen, Requisiten, Labor- und Materialkosten,
						Studiomieten etc.) sind vom Auftraggeber zu tragen. Gegenüber
						Endverbrauchern weist der Fotograf die Endpreise inkl.
						Mehrwertsteuer aus.
						<br />
						<br />
						2. Fällige Rechnungen sind sofort ohne Abzug zu zahlen. Der
						Auftraggeber gerät in Verzug, wenn er fällige Rechnungen nicht
						spätestens 30 (in Worten: dreißig) Tage nach Zugang einer Rechnung
						oder gleichwertigen Zahlungsaufforderung begleicht. Dem Fotografen
						bleibt vorbehalten, den Verzug durch Erteilung einer nach Fälligkeit
						zugehenden Mahnung zu einem früheren Zeitpunkt herbeizuführen.
						<br />
						<br />
						3. Bis zur vollständigen Bezahlung des Kaufpreises bleiben die
						gelieferten Lichtbilder Eigentum des Fotografen.
						<br />
						<br />
						4. Hat der Auftraggeber dem Fotografen keine ausdrücklichen
						Weisungen hinsichtlich der Gestaltung der Lichtbilder gegeben, so
						sind Reklamationen bezüglich der Bildauffassung sowie der
						künstlerisch-technischen Gestaltung ausgeschlossen. Wünscht der
						Auftraggeber während oder nach der Aufnahmeproduktion Änderungen, so
						hat er die Mehrkosten zu tragen. Der Fotograf behält den
						Vergütungs-Anspruch für bereits begonnene Arbeiten.
						<br />
						<br />
						IV. Haftung
						<br />
						<br />
						1. Für die Verletzung von Pflichten, die nicht in unmittelbarem
						Zusammenhang mit wesentlichen Vertragspflichten stehen, haftet der
						Fotograf für sich und seine Erfüllungsgehilfen nur bei Vorsatz und
						grober Fahrlässigkeit. Er haftet ferner für Schäden aus der
						Verletzung des Lebens, des Körpers oder der Gesundheit sowie aus der
						Verletzung wesentlicher Vertragspflichten, die er oder seine
						Erfüllungsgehilfen durch schuldhafte Pflichtverletzungen
						herbeigeführt haben. Für Schäden an Aufnahmeobjekten, Vorlagen,
						Filmen, Displays, Layouts, Negativen oder Daten haftet der Fotograf
						– wenn nichts anderes vereinbart wurde – nur bei Vorsatz und grober
						Fahrlässigkeit.
						<br />
						<br />
						2. Der Fotograf verwahrt die Negative bzw. Digitale Daten
						sorgfältig. Er ist berechtigt, aber nicht verpflichtet, von ihm
						aufbewahrte Negative oder Digitale Daten nach 6 Monaten seit
						Beendigung des Auftrags zu vernichten.
						<br />
						<br />
						3. Der Fotograf haftet für Lichtbeständigkeit und Dauerhaftigkeit
						der Lichtbilder nur im Rahmen der Garantieleistungen der Hersteller
						des Fotomaterials.
						<br />
						<br />
						4. Die Zusendung und Rücksendung von Filmen, Bildern, Datenträgern
						und Vorlagen erfolgt auf Kosten und Gefahr des Auftraggebers. Der
						Auftraggeber kann bestimmen, wie und durch wen die Rücksendung
						erfolgt.
						<br />
						<br />
						V. Nebenpflichten
						<br />
						<br />
						1. Der Auftraggeber versichert, dass er an allen dem Fotografen
						übergebenen Vorlagen das Vervielfältigungs- und Verbreitungsrecht
						sowie bei Personenbildnissen die Einwilligung der abgebildeten
						Personen zur Veröffentlichung, Vervielfältigung und Verbreitung
						besitzt. Ersatzansprüche Dritter, die auf der Verletzung dieser
						Pflicht beruhen, trägt der Auftraggeber.
						<br />
						<br />
						2. Der Auftraggeber verpflichtet sich, die Aufnahmeobjekte
						rechtzeitig zur Verfügung zu stellen und unverzüglich nach der
						Aufnahme wieder abzuholen. Holt der Auftraggeber nach Aufforderung
						die Aufnahmeobjekte nicht spätestens nach zwei Werktagen ab, ist der
						Fotograf berechtigt, gegebenenfalls Lagerkosten zu berechnen oder
						bei Blockierung seiner Studioräume die Gegenstände auf Kosten des
						Auftraggebers auszulagern. Transport- und Lagerkosten gehen zu
						Lasten des Auftraggebers.
						<br />
						<br />
						VI. Leistungsstörung, Ausfallhonorar
						<br />
						<br />
						1. Überlässt der Fotograf dem Auftraggeber mehrere Lichtbilder zur
						Auswahl, hat der Auftraggeber die nicht ausgewählten Lichtbilder
						innerhalb einer Woche nach Zugang – wenn keine längere Zeit
						vereinbart wurde – auf eigene Kosten und Gefahr zurücksenden. Für
						verlorene oder beschädigte Lichtbilder kann der Fotograf, sofern er
						den Verlust oder die Beschädigung nicht zu vertreten hat, Bezahlung
						verlangen.
						<br />
						<br />
						2. Überlässt der Fotograf dem Auftraggeber Bilder aus seinem Archiv,
						so hat der Auftraggeber die nicht ausgewählten Bilder innerhalb
						eines Monats nach Zugang beim Auftraggeber, die ausgewählten
						innerhalb eines Monats nach Verwendung zurückzuschicken. Kommt der
						Auftraggeber mit der Rücksendung in Verzug, kann der Fotograf eine
						Blockierungsgebühr von 1 (in Worten: einem) Euro pro Tag und Bild
						verlangen, sofern nicht der Auftraggeber nachweist, dass ein Schaden
						nicht entstanden oder niedriger ist als die Schadenspauschale. Bei
						Verlust oder Beschädigung, die eine weitere Verwendung der Bilder
						ausschließt, kann der Fotograf Schadenersatz verlangen. Der
						Schadenersatz beträgt mindestens 2000 (in Worten: zweitausend) Euro
						für jedes Original und 200 (in Worten: zweihundert) Euro für jedes
						Duplikat, sofern nicht der Auftraggeber nachweist, dass ein Schaden
						nicht entstanden oder niedriger ist als die Schadenspauschale. Die
						Geltendmachung eines höheren Schadens bleibt dem Fotografen
						vorbehalten.
						<br />
						<br />
						3. Wird die für die Durchführung des Auftrages vorgesehene Zeit aus
						Gründen, die der Fotograf nicht zu vertreten hat, wesentlich
						überschritten, so erhöht sich das Honorar des Fotografen, sofern ein
						Pauschalpreis vereinbart war, entsprechend. Ist ein Zeithonorar
						vereinbart, erhält der Fotograf auch für die Wartezeit den
						vereinbarten Stunden- oder Tagessatz, sofern nicht der Auftraggeber
						nachweist, dass dem Fotografen kein Schaden entstanden ist. Bei
						Vorsatz oder Fahrlässigkeit des Auftraggebers kann der Fotograf auch
						Schadensersatzansprüche geltend machen.
						<br />
						<br />
						4. Liefertermine für Lichtbilder sind nur dann verbindlich, wenn sie
						ausdrücklich vom Fotografen schriftlich bestätigt worden sind. Der
						Fotograf haftet für Fristüberschreitung nur bei Vorsatz und grober
						Fahrlässigkeit.
						<br />
						<br />
						VII. Datenschutz
						<br />
						<br />
						Zum Geschäftsverkehr erforderliche personenbezogene Daten des
						Auftraggebers können gespeichert werden. Der Fotograf verpflichtet
						sich, alle ihm im Rahmen des Auftrages bekannt gewordenen
						Informationen vertraulich zu behandeln.
						<br />
						<br />
						VIII. Digitale Fotografie
						<br />
						<br />
						1. Die Digitalisierung, Speicherung und Vervielfältigung der
						Lichtbilder des Fotografen auf Datenträgern oder in Bilderform aller
						Art bedarf der vorherigen schriftlichen Zustimmung des Fotografen.
						<br />
						<br />
						2. Die Übertragung von Nutzungsrechten beinhaltet nicht das Recht
						zur Speicherung und Vervielfältigung, wenn dieses Recht nicht
						ausdrücklich übertragen wurde.
						<br />
						<br />
						IX. Bildbearbeitung
						<br />
						<br />
						1. Die Bearbeitung von Lichtbildern des Fotografen und ihre
						Vervielfältigung und Verbreitung, analog oder digital, bedarf der
						vorherigen Zustimmung des Fotografen. Entsteht durch Foto-Composing,
						Montage oder sonstige elektronische Manipulation ein neues Werk, ist
						dieses mit [M] zu kennzeichnen. Die Urheber der verwendeten Werke
						und der Urheber des neuen Werkes sind Miturheber im Sinne des
						§8UrhG.
						<br />
						<br />
						2. Der Auftraggeber ist verpflichtet, Lichtbilder des Fotografen
						digital so zu speichern und zu kopieren, dass der Name des
						Fotografen mit den Bilddaten elektronisch verknüpft wird.
						<br />
						<br />
						3. Der Auftraggeber ist verpflichtet, diese elektronische
						Verknüpfung so vorzunehmen, dass sie bei jeder Art von
						Datenübertragung, bei jeder Wiedergabe auf Bildschirmen, bei allen
						Arten von Projektionen, insbesondere bei jeder öffentlichen
						Wiedergabe, erhalten bleibt und der Fotograf als Urheber der Bilder
						klar und eindeutig identifizierbar ist.
						<br />
						<br />
						4. Der Auftraggeber versichert, dass er dazu berechtigt ist, den
						Fotografen mit der elektronischen Bearbeitung fremder Lichtbilder zu
						beauftragen, wenn er einen solchen Auftrag erteilt. Er stellt den
						Fotografen von allen Ansprüchen Dritter frei, die auf der Verletzung
						dieser Pflicht beruhen.
						<br />
						<br />
						X. Nutzung und Verbreitung
						<br />
						<br />
						1. Die Verbreitung von Lichtbildern des Fotografen im Internet und
						in Intranets, in Online-Datenbanken, in elektronischen Archiven, die
						nicht nur für den internen Gebrauch des Auftraggebers bestimmt sind,
						auf Diskette, CD-ROM oder ähnlichen Datenträgern ist nur aufgrund
						einer besonderen Vereinbarung zwischen dem Fotografen und dem
						Auftraggeber gestattet.
						<br />
						<br />
						2. Die Weitergabe digitalisierter Lichtbilder im Internet und in
						Intranets und auf Datenträgern und Geräten, die zur öffentlichen
						Wiedergabe auf Bildschirmen oder zur Herstellung von Soft- und
						Hardcopies geeignet sind, bedarf der vorherigen schriftlichen
						Zustimmung des Fotografen.
						<br />
						<br />
						3. Die Vervielfältigung und Verbreitung von Bearbeitungen, die der
						Fotograf auf elektronischem Wege hergestellt hat, bedürfen der
						vorherigen schriftlichen Zustimmung des Fotografen.
						<br />
						<br />
						4. Der Fotograf ist nicht verpflichtet, Datenträger, Dateien und
						Daten an den Auftraggeber herauszugeben, wenn dies nicht
						ausdrücklich schriftlich vereinbart wurde.
						<br />
						<br />
						5. Wünscht der Auftraggeber, dass der Fotograf ihm Datenträger,
						Dateien und Daten zur Verfügung stellt, ist dies zu vereinbaren und
						gesondert zu vergüten.
						<br />
						<br />
						6. Hat der Fotograf dem Auftraggeber Datenträger, Dateien und Daten
						zur Verfügung gestellt, dürfen diese nur mit vorheriger Einwilligung
						des Fotografen verändert werden.
						<br />
						<br />
						7. Gefahr und Kosten des Transports von Datenträgern, Dateien und
						Daten online und offline liegen beim Auftraggeber; die Art und Weise
						der Übermittlung kann der Auftragnehmer bestimmen.
						<br />
						<br />
						XI. Schlussbestimmungen
						<br />
						<br />
						Erfüllungsort für alle Verpflichtungen aus dem Vertragsverhältnis
						ist der Sitz des Fotografen, wenn der Vertragspartner nicht
						Verbraucher ist. Sind beide Vertragsparteien Kaufleute, juristische
						Personen des öffentlichen Rechts oder ein öffentlich rechtliches
						Sondervermögen, so ist der Geschäftssitz des Fotografen als
						Gerichtsstand vereinbart. Die EU-Kommission stellt eine Plattform
						für die außergerichtliche Online-Streitbeilegung (OS-Plattform)
						bereit, die unter{" "}
						<a href="https://ec.europa.eu/consumers/odr">
							https://ec.europa.eu/consumers/odr
						</a>{" "}
						aufrufbar ist. Wir sind weder bereit noch verpflichtet, an einem
						Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
						teilzunehmen.
						<br />
						<br />
						<br />
						<div
							className="d-flex align-items-center justify-content-center"
							style={{ width: "100%" }}
						>
							<p>© 2024 N. Eker</p>
						</div>
					</Modal.Body>
				</>
			);
		case "ImpressumDialog":
			return (
				<>
					<Modal.Header closeButton>
						<Modal.Title>Impressum</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Angaben gemäß § 5 TMG:
						<br />
						<br />
						Fix Foto Studio1
						<br />
						Fotolabor Frankfurt
						<br />
						Grüneburgweg 8
						<br />
						60322 Frankfurt am Main
						<br />
						<br />
						Inhaber: N. Eker
						<br />
						<br />
						STNR: 014 869 45213
						<br />
						<br />
						Kontakt:
						<br />
						Telefon: 069-90500535
						<br />
						E-Mail:{" "}
						<a href="fix-foto-studio1@gmx.de">fix-foto-studio1@gmx.de</a>
						<br />
						<br />
						Quelle:{" "}
						<a href="http://www.e-recht24.de">http://www.e-recht24.de</a>
						<br />
						<br />
						<br />
						<b>Haftungsausschluss (Disclaimer)</b>
						<br />
						<br />
						Haftung für Inhalte
						<br />
						<br />
						Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
						auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
						§§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
						verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
						überwachen oder nach Umständen zu forschen, die auf eine
						rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
						oder Sperrung der Nutzung von Informationen nach den allgemeinen
						Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
						jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
						Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
						Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
						<br />
						<br />
						Haftung für Links
						<br />
						<br />
						Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
						Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
						fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
						verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
						der Seiten verantwortlich. Die verlinkten Seiten wurden zum
						Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
						Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
						erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
						Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
						nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
						derartige Links umgehend entfernen.
						<br />
						<br />
						Urheberrecht
						<br />
						<br />
						Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
						diesen Seiten unterliegen dem deutschen Urheberrecht. Die
						Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
						Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
						schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
						Downloads und Kopien dieser Seite sind nur für den privaten, nicht
						kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
						Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
						Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
						gekennzeichnet. Sollten Sie trotzdem auf eine
						Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
						entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
						werden wir derartige Inhalte umgehend entfernen.
						<br />
						<br />
						<br />
						<div
							className="d-flex align-items-center justify-content-center"
							style={{ width: "100%" }}
						>
							<p>© 2024 N. Eker</p>
						</div>
					</Modal.Body>
				</>
			);
		case "DatenschutzDialog":
			return (
				<>
					<Modal.Header closeButton>
						<Modal.Title>Datenschutzerklärung</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
						Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
						vertraulich und entsprechend der gesetzlichen
						Datenschutzvorschriften sowie dieser Datenschutzerklärung.
						<br />
						<br />
						Die Nutzung unserer Webseite ist in der Regel ohne Angabe
						personenbezogener Daten möglich. Soweit auf unseren Seiten
						personenbezogene Daten (beispielsweise Name, Anschrift oder
						E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
						auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
						Zustimmung nicht an Dritte weitergegeben.
						<br />
						<br />
						Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B.
						bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann.
						Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
						nicht möglich.
						<br />
						<br />
						<br />
						<div
							className="d-flex align-items-center justify-content-center"
							style={{ width: "100%" }}
						>
							<p>© 2024 N. Eker</p>
						</div>
					</Modal.Body>
				</>
			);
		case "LocationDialog":
			return (
				<>
					<Modal.Header closeButton>
						<Modal.Title>Besuchen Sie uns!</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<a
							target="_blank"
							href="https://www.google.com/maps/dir//Gr%C3%BCneburgweg+8,+60322+Frankfurt+am+Main/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x47bd0eb398ca3159:0xe31e7287bfa1365b?sa=X&ved=1t:707&ictx=111"
						>
							<img
								style={{ width: "100%", borderRadius: "5px" }}
								src={loc}
							></img>
						</a>
						<br />
						<br />
						Fix Foto Studio1
						<br />
						Fotolabor Frankfurt
						<br />
						Grüneburgweg 8
						<br />
						60322 Frankfurt am Main
						<br />
						<br />
						Öffnungszeiten:
						<br />
						Mo. - Fr. 9:00 - 18:30
						<br />
						Sa. 9:00 - 14:00
						<br />
						<br />
					</Modal.Body>
				</>
			);
	}
};

export default InfoDialog;
