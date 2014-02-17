package uk.ac.cam.cl.foxtrot.server;

public class FullDataPoint {
	private String dataSetCode;
	private String year;
	private String countryCode;
	private String value;

	public void setDataSetCode(String dataSetCode) {
		this.dataSetCode = dataSetCode;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDataSetCode() {
		return dataSetCode;
	}

	public String getYear() {
		return year;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public String getValue() {
		return value;
	}
}