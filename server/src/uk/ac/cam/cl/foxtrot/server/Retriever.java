package uk.ac.cam.cl.foxtrot.server;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.glassfish.jersey.server.JSONP;

import com.google.appengine.api.utils.SystemProperty;

@Path("/{dataset}/{year}/{country}")
public class Retriever {

	@GET
	@JSONP(queryParam = "callback")
	@Produces({"application/javascript"})
	public Visualisation getVisualisation(
			@PathParam("dataset") String dataset,
			@PathParam("year") String year,
			@PathParam("country") String country) throws SQLException, IOException {

		String url = null;

		try {
			if (SystemProperty.environment.value() == SystemProperty.Environment.Value.Production) {
				Class.forName("com.mysql.jdbc.GoogleDriver");
				url = "jdbc:google:mysql://money-world:database/test?user=root";
			} else {
				Class.forName("com.mysql.jdbc.Driver");
				BufferedReader configReader = new BufferedReader(new FileReader("/media/data/workspace/Money World/server/server.config"));
				url = configReader.readLine();
				configReader.close();
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		Connection connection = DriverManager.getConnection(url);

		String dataSetCondition = "DataSetCode = '" + dataset + "'";
		String yearCondition = "Year = '" + year + "'";
		String countryCondition = "CountryCode2 = '" + country + "'";

		if ( dataset.equals("all") ) {
			dataSetCondition = "DataSetCode LIKE '%'";
		}

		if ( year.equals("all") ) {
			yearCondition = "Year LIKE '%'";
		}

		if ( country.equals("all") ) {
			countryCondition = "CountryCode2 LIKE '%'";
		}

		String selectStmtString = "SELECT DataSetCode, Year, CountryCode2, Value " +
				"FROM DataPoint " +
				"JOIN CountryCode ON DataPoint.CountryCode = CountryCode.CountryCode3 " +
				"WHERE " + dataSetCondition + " AND " + yearCondition + " AND " + countryCondition;
		PreparedStatement selectStmt = null;
		selectStmt = connection.prepareStatement(selectStmtString);

		ResultSet rs = null;
		Visualisation viz = new Visualisation();

		/*
		viz.setDataSet(dataset);
		viz.setYear(year);
		viz.setCountry(country);
		 */

		String currentDataSetCode = "";
		String currentYear = "";
		String currentCountryCode = "";
		String currentValue = "";

		/*
		YearMap currentYearMap = null;
		CountryMap currentCountryMap = null;
		String currentStoredValue = null;
		 */

		try {
			rs = selectStmt.executeQuery();
			while ( rs.next() ) {
				currentDataSetCode = rs.getString(1);
				currentYear = rs.getString(2);
				currentCountryCode = rs.getString(3);
				currentValue = rs.getString(4);

				FullDataPoint currentDataPoint = new FullDataPoint();
				currentDataPoint.setDataSetCode(currentDataSetCode);
				currentDataPoint.setYear(currentYear);
				currentDataPoint.setCountryCode(currentCountryCode);
				currentDataPoint.setValue(currentValue);
				viz.getDataPointList().add(currentDataPoint);

				/* currentYearMap = viz.getDataSetMap().get(currentDataSetCode);
				if ( currentYearMap == null ) {
					currentYearMap = new YearMap();
					viz.getDataSetMap().put(currentDataSetCode, currentYearMap);
				}

				currentCountryMap = currentYearMap.getYearMap().get(currentYear);
				if ( currentCountryMap == null ) {
					currentCountryMap = new CountryMap();
					currentYearMap.getYearMap().put(currentYear, currentCountryMap);
				}

				currentStoredValue = currentCountryMap.getDataPointMap().get(currentCountryCode);
				if ( currentStoredValue == null ) {
					currentStoredValue = currentValue;
					currentCountryMap.getDataPointMap().put(currentCountryCode, currentStoredValue);
				} */
			}
		} finally {
			selectStmt.close();
		}

		return viz;
	}
}
