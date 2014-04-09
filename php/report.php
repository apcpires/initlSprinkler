<?php
require_once('WkHtmlToPdf.php');

$html = $_POST['svg'];
$file = fopen("../tmp/reportTemp.html","w");
fwrite($file,$html);
fclose($file);

$pdf = new WkHtmlToPdf;
// Add a HTML file, a HTML string or a page from a URL
$pdf->addPage('../tmp/reportTemp.html');
$pdf->send('report.pdf');

echo '{success: true}';

?>
