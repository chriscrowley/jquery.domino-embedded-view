var OldSortImages = ["altasc.gif", "altdesc.gif", "ascsort.gif", "dblasc.gif", "dbldesc.gif", "dblsort.gif", "descsort.gif"];;
var NewSortImages = [ "altascR.gif", "altdescR.gif", "ascsortR.gif", "dblascR.gif", "dbldescR.gif", "dblsortR.gif", "descsortR.gif"];

$(document).ready(function()
{
	$( ".domino-view-colhead th img" ).each(function( index )
	{
		var th = $(this).closest('th');
		var link = $(this).closest('a').attr('href');
		var linkAsc = (/resortdescending/i.test(link)) ? link.replace(/resortdescending/i, 'ResortAscending') : link;
		var linkDesc = (/resortascending/i.test(link)) ? link.replace(/resortascending/i, 'ResortDescending') : link;
		
		var isColumnSorted = (/asc.gif/i).test($(this).attr('src')) || (/desc.gif/i).test($(this).attr('src'));
		
		if(isColumnSorted)
		{
			th.css('background-color', '#aaceeb');
		}

		var isDoubleSort = (/dbl/i).test($(this).attr('src'));
		
		if (isDoubleSort)
		{
			var mapname = 'sort' + $.urlParam(linkAsc, 'ResortAscending');
			var map = "";
			map += '<map name="' + mapname + '">\n';
			map += '<area href="' + linkAsc + '" shape="rect" coords="0, 3, 12, 11" alt="Asc" />\n';
			map += '<area href="' + linkDesc + '" shape="rect" coords="0, 10, 12, 16" alt="Desc" />\n';
			//map += '<area href="' + linkAsc + '" shape="rect" coords="0, 3, 16, 10" alt="Asc" />\n';
			//map += '<area href="' + linkDesc + '" shape="rect" coords="0, 10, 16, 16" alt="Desc" />\n';
			map += '</map>';
			th.wrapInner(map);
			$(this).closest('a').contents().unwrap();
			$(this).attr('usemap', '#' + mapname);
		}
	});
	for (i in OldSortImages)
	{

		$('img[src="' + "/icons/" + OldSortImages[i] + '"]').removeAttr('width').attr('src', NewSortImages[i] + "?OpenImageResource");
		
	}
});
$.urlParam = function(url, name)
{
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);

	if (results==null)
	{
		return null;
	}
	else
	{
		return results[1] || 0;
	}
}
function replaceWithAnchor(selector,url)
{
	$(selector).replaceWith(function()
	{
		return $("<a></a>").attr("href",url).append($(this).contents());
	});
}
function LightenDarkenColor(col,amt)
{
	var usePound = false;
	if ( col[0] == "#" )
	{
		col = col.slice(1);
		usePound = true;
	}

	var num = parseInt(col,16);

	var r = (num >> 16) + amt;

	if ( r > 255 ) r = 255;
	else if  (r < 0) r = 0;

	var b = ((num >> 8) & 0x00FF) + amt;

	if ( b > 255 ) b = 255;
	else if  (b < 0) b = 0;

	var g = (num & 0x0000FF) + amt;

	if ( g > 255 ) g = 255;
	else if  ( g < 0 ) g = 0;

	return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}