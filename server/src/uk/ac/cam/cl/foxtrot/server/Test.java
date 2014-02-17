package uk.ac.cam.cl.foxtrot.server;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/test")
public class Test {

	/*
	// This method is called if TEXT_PLAIN is requested
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello() {
		return "Hello Jersey";
	}

	// This method is called if XML is requested
	@GET
	@Produces(MediaType.TEXT_XML)
	public String sayXMLHello() {
		return "<?xml version=\"1.0\"?>" + "<hello> Hello Jersey" + "</hello>";
	}

	// This method is called if HTML is requested
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String sayHtmlHello() {
		return "<html> " + "<title>" + "Hello Jersey" + "</title>"
				+ "<body><h1>" + "Hello Jersey" + "</body></h1>" + "</html> ";
	}
	 */

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public DataSetMap sayJSONHello() {
		CountryMap cm = new CountryMap();
		cm.getDataPointMap().put("SGP", "111");
		cm.getDataPointMap().put("MSA", "0");

		YearMap ym = new YearMap();
		ym.getYearMap().put("1994", cm);

		DataSetMap dm = new DataSetMap();
		dm.getDataSetMap().put("GDP", ym);

		return dm;

		/*
		DataPoint dp1 = new DataPoint();
		dp1.setName("DP1");
		//dp1.setValue(1);

		DataPoint dp2 = new DataPoint();
		dp2.setName("DP2");
		//dp2.setValue(2);

		DataPointMap dpm = new DataPointMap();
		dpm.getDataPointMap().put("X1", dp1);
		dpm.getDataPointMap().put("X2", dp2);
		return dpm;
		 */

		/*
		Address billingAddress = new Address();
		billingAddress.setStreet("1 A Street");

		Address shippingAddress = new Address();
		shippingAddress.setStreet("2 B Road");

		Customer customer = new Customer();
		customer.getAddressMap().put("billing", billingAddress);
		customer.getAddressMap().put("shipping", shippingAddress);
		return customer;
		 */
	}
}